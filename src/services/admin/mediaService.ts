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

/** POST /admin/media/ body — only send media_directory_id when it's a real parent */
export interface CreateMediaPayload {
    name: string;
    path: string;
    media_directory_id?: number; // omit for root; min 1
}

/** PUT /admin/media/:id body */
export interface UpdateMediaPayload {
    name?: string;
    path?: string;
    media_directory_id?: number; // omit for root; min 1
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
            Object.assign(payload, buildParentPayload(opts.parentId ?? null));
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
