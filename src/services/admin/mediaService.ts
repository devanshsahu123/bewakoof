import axios from "axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MediaItem {
    id: number;
    name: string;
    path: string;
    parentId: number | null;   // normalized from mediaDirectoryId in GET response
    parentName: string | null;
}

export interface MediaListMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface MediaListResponse {
    message: string;
    data: MediaItem[];
    meta: MediaListMeta;
}

export interface MediaResponse {
    message: string;
    data: MediaItem;
}

// ─── Media File Types ─────────────────────────────────────────────────────────

export interface MediaFileItem {
    id: number;
    name: string;
    file: string; // Typically a URL or S3 key
    media_directory_id: number | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface MediaFileListResponse {
    message: string;
    data: MediaFileItem[];
    meta: MediaListMeta;
}

export interface MediaFileResponse {
    message: string;
    data: MediaFileItem;
}

/** POST /admin/media/ body — only send media_directory_id when it's a real parent */
export interface CreateMediaPayload {
    name: string;
    path: string;
    media_directory_id?: number; // omit for root; min 1
}

export interface UpdateMediaPayload {
    name?: string;
    path?: string;
    media_directory_id?: number | null; // allow null for root
}

// ─── Axios instance with hardcoded admin token ────────────────────────────────

const ADMIN_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AeW9wbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzMzMjQ2OTUsImlhdCI6MTc3MjcxOTg5NX0.gtF0nu0ZPOesb5NbWWmciy6GfYwoAmtnOmAeOmX6p8w";

const adminAxios = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1"}`,
    timeout: 12_000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${ADMIN_TOKEN}`,
    },
});

// ─── Normalizer ───────────────────────────────────────────────────────────────

/**
 * Normalizes a raw API response item into a consistent MediaItem.
 *
 * GET response uses camelCase `mediaDirectoryId` for the parent.
 * Treats null/0/undefined as root → parentId: null.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeItem(raw: any): MediaItem {
    const rawParent =
        raw.mediaDirectoryId ??  // GET response field (camelCase)
        raw.media_directory_id ?? // just in case snake_case leaks through
        null;

    const parentId: number | null =
        rawParent != null && rawParent !== 0
            ? Number(rawParent)
            : null;

    return {
        id: Number(raw.id),
        name: String(raw.name ?? ""),
        path: String(raw.path ?? raw.name ?? ""),
        parentId,
        parentName: raw.parentName ?? null,
    };
}

/**
 * Normalizes a raw API response item into a consistent MediaFileItem.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeFileItem(raw: any): MediaFileItem {
    const rawDirId = raw.mediaDirectoryId ?? raw.media_directory_id ?? null;
    const media_directory_id = rawDirId != null && rawDirId !== 0 ? Number(rawDirId) : null;

    return {
        id: Number(raw.id),
        name: String(raw.name ?? ""),
        file: String(raw.file ?? ""),
        media_directory_id,
        createdAt: raw.createdAt ?? raw.created_at,
        updatedAt: raw.updatedAt ?? raw.updated_at,
    };
}

/**
 * Builds the write payload, omitting media_directory_id when moving to root.
 * The backend schema requires minimum: 1, so null/0 would fail validation.
 */
function buildParentPayload(parentId: number | null): Pick<CreateMediaPayload, "media_directory_id"> {
    return parentId != null && parentId > 0
        ? { media_directory_id: parentId }
        : {};   // omit entirely for root
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const mediaService = {
    /** Fetch a single page of results */
    async getList(page = 1, limit = 100): Promise<MediaListResponse> {
        const { data } = await adminAxios.get<MediaListResponse>(
            `/admin/media/`,
            { params: { page, limit } }
        );
        return {
            ...data,
            data: data.data.map(normalizeItem),
        };
    },

    /** Fetch ALL pages and return a flat normalized array */
    async getAll(): Promise<MediaItem[]> {
        const first = await mediaService.getList(1, 100);
        const { totalPages } = first.meta;
        if (totalPages <= 1) return first.data;

        const rest = await Promise.all(
            Array.from({ length: totalPages - 1 }, (_, i) =>
                mediaService.getList(i + 2, 100).then((r) => r.data)
            )
        );
        return [...first.data, ...rest.flat()];
    },

    /** Create a new folder */
    async create(name: string, path: string, parentId: number | null): Promise<MediaItem> {
        const payload: CreateMediaPayload = {
            name,
            path,
            ...buildParentPayload(parentId),
        };
        const { data } = await adminAxios.post<MediaResponse>(`/admin/media/`, payload);
        return normalizeItem(data.data);
    },

    /** Update a folder by id */
    async update(
        id: number,
        opts: { name?: string; path?: string; parentId?: number | null }
    ): Promise<MediaItem> {
        const payload: UpdateMediaPayload = {};
        if (opts.name !== undefined) payload.name = opts.name;
        if (opts.path !== undefined) payload.path = opts.path;
        // Only include media_directory_id if parentId was explicitly provided
        if ("parentId" in opts) {
            payload.media_directory_id = opts.parentId ?? null;
        }
        const { data } = await adminAxios.put<MediaResponse>(
            `/admin/media/${id}`,
            payload
        );
        return normalizeItem(data.data);
    },

    /** Delete a folder by id */
    async remove(id: number): Promise<void> {
        await adminAxios.delete(`/admin/media/${id}`);
    },
};

// ─── File Service ─────────────────────────────────────────────────────────────

export const mediaFileService = {
    /** Fetch paginated media files, optionally filtered by directory */
    async getList(page = 1, limit = 50, media_directory_id?: number | null): Promise<MediaFileListResponse> {
        const params: Record<string, string | number> = { page, limit };
        if (media_directory_id != null && media_directory_id !== 0) {
            params.media_directory_id = media_directory_id;
        }
        const { data } = await adminAxios.get<MediaFileListResponse>(
            `/admin/media-files/`,
            { params }
        );
        return {
            ...data,
            data: data.data.map(normalizeFileItem),
        };
    },

    /** Upload a new file */
    async create(file: File, name: string, media_directory_id?: number | null): Promise<MediaFileItem> {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        if (media_directory_id != null && media_directory_id !== 0) {
            formData.append("media_directory_id", String(media_directory_id));
        }

        const { data } = await adminAxios.post<MediaFileResponse>(
            `/admin/media-files/`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return normalizeFileItem(data.data);
    },

    /** Update a file's metadata or replace the file entirely */
    async update(
        id: number,
        opts: { name?: string; file?: File; media_directory_id?: number | null }
    ): Promise<MediaFileItem> {
        const formData = new FormData();
        if (opts.name !== undefined) formData.append("name", opts.name);
        if (opts.file !== undefined) formData.append("file", opts.file);

        if ("media_directory_id" in opts) {
            if (opts.media_directory_id != null && opts.media_directory_id !== 0) {
                formData.append("media_directory_id", String(opts.media_directory_id));
            } else {
                formData.append("media_directory_id", ""); // To clear the directory if the backend supports it
            }
        }

        const { data } = await adminAxios.put<MediaFileResponse>(
            `/admin/media-files/${id}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return normalizeFileItem(data.data);
    },

    /** Delete a file by id */
    async remove(id: number): Promise<void> {
        await adminAxios.delete(`/admin/media-files/${id}`);
    },
};
