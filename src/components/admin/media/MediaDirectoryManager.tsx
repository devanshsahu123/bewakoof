"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  FormEvent,
} from "react";
import {
  HiOutlineFolder,
  HiOutlineFolderOpen,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineRefresh,
  HiOutlineSearch,
  HiOutlineX,
  HiOutlineCheck,
  HiOutlineFolderAdd,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { mediaService, MediaItem } from "@/services/admin/mediaService";
import MediaFilesGrid from "./MediaFilesGrid";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ─── Add Folder Modal ──────────────────────────────────────────────────────────

interface AddFolderModalProps {
  onClose: () => void;
  onAdd: (name: string) => Promise<void>;
  parentName?: string | null;
}

function AddFolderModal({ onClose, onAdd, parentName }: AddFolderModalProps) {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Folder name cannot be empty.");
      return;
    }
    setSubmitting(true);
    try {
      await onAdd(trimmed);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Failed to create folder. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-yellow-100 shadow-sm border border-yellow-200/50">
              <HiOutlineFolderAdd size={20} className="text-yellow-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">
              {parentName ? `Add Subfolder to "${parentName}"` : "Add Root Folder"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all"
          >
            <HiOutlineX size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Folder Name
            </label>
            <input
              type="text"
              required
              autoFocus
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="e.g. Products Images"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 outline-none focus:bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all"
            />
            {error && (
              <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1.5">
                <HiOutlineExclamationCircle size={16} />
                {error}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-900 transition-all border border-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-3 rounded-xl text-sm font-bold bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 transition-all"
            >
              {submitting ? "Creating…" : "Create Folder"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Move Folder Modal ────────────────────────────────────────────────────────

interface MoveFolderModalProps {
  node: MediaItem;
  folders: MediaItem[];
  onClose: () => void;
  onMove: (parentId: number | null) => Promise<void>;
}

function MoveFolderModal({ node, folders, onClose, onMove }: MoveFolderModalProps) {
  const [selectedParentId, setSelectedParentId] = useState<number | null>(node.parentId);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isLevel2 = node.parentId !== null;
  const hasChildren = folders.some((f) => f.parentId === node.id);

  // Available destinations
  const availableRoots = folders.filter((f) => f.parentId === null && f.id !== node.id);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onMove(selectedParentId);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Failed to move folder. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
             <div className="p-2.5 rounded-xl bg-gray-100 shadow-sm border border-gray-200/50">
              <HiOutlineRefresh className="text-gray-600 rotate-90" size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-900">
              Move "{node.name}"
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all"
          >
            <HiOutlineX size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Destination
            </label>
            <select
              value={selectedParentId === null ? "" : selectedParentId.toString()}
              onChange={(e) => setSelectedParentId(e.target.value ? Number(e.target.value) : null)}
              disabled={hasChildren}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none focus:bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all"
            >
              <option value="">-- Move to Root --</option>
              {availableRoots.map((root) => (
                <option key={root.id} value={root.id}>
                  {root.name}
                </option>
              ))}
            </select>
            {hasChildren && (
              <p className="mt-2 text-sm text-yellow-600 font-medium bg-yellow-50 p-3 rounded-xl border border-yellow-100">
                Folders containing subfolders cannot be moved.
              </p>
            )}
            {error && (
              <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1.5 bg-red-50 p-3 rounded-xl border border-red-100">
                <HiOutlineExclamationCircle size={16} className="shrink-0" />
                {error}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-900 transition-all border border-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || hasChildren || selectedParentId === node.parentId}
              className="flex-1 px-4 py-3 rounded-xl text-sm font-bold bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 transition-all"
            >
              {submitting ? "Moving…" : "Move folder"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ──────────────────────────────────────────────────────

interface DeleteConfirmModalProps {
  node: MediaItem;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

function DeleteConfirmModal({ node, onClose, onConfirm }: DeleteConfirmModalProps) {
  const [deleting, setDeleting] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-red-100 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">
        <div className="px-8 pt-8 pb-6 space-y-5 text-center">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-red-50 border-4 border-white shadow-md relative group">
              <HiOutlineTrash size={32} className="text-red-500 transform group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900">Delete Folder?</h2>
            <p className="text-sm text-gray-500 leading-relaxed px-2">
              Are you sure you want to delete the folder <br/>
              <span className="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-md inline-block mt-1 border border-red-100">"{node.name}"</span>? <br/>
              This will also permanently delete any files inside it.
            </p>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-900 transition-all border border-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                setDeleting(true);
                try {
                  await onConfirm();
                  onClose();
                } catch (err) {
                  setDeleting(false);
                }
              }}
              disabled={deleting}
              className="flex-1 px-4 py-3 rounded-xl text-sm font-bold bg-red-500 text-white hover:bg-red-400 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 transition-all shadow-md shadow-red-500/20"
            >
              {deleting ? "Deleting…" : "Yes, delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MediaDirectoryManager() {
  const [folders, setFolders] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [addingSubfolderTo, setAddingSubfolderTo] = useState<MediaItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);
  const [moveTarget, setMoveTarget] = useState<MediaItem | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await mediaService.getAll();
      setFolders(items);
      if (items.length > 0 && selectedFolderId === null) {
        setSelectedFolderId(items[0].id);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load media directories.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [selectedFolderId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleAdd = useCallback(
    async (name: string) => {
      const path = slugify(name);
      const parentId = addingSubfolderTo?.id ?? null;
      const created = await mediaService.create(name, path, parentId);
      setFolders((prev) => [...prev, created]);
      setSelectedFolderId(created.id); 
    },
    [addingSubfolderTo]
  );

  const handleDelete = useCallback(async (node: MediaItem) => {
    const id = node.id;
    setFolders((prev) => prev.filter((n) => n.id !== id));
    if (selectedFolderId === id) setSelectedFolderId(null);

    try {
      await mediaService.remove(id);
      await fetchAll(); 
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "Failed to delete folder.";
      setError(msg);
      await fetchAll();
    }
  }, [fetchAll, selectedFolderId]);

  const startEdit = useCallback((node: MediaItem) => {
    setEditingId(node.id);
    setEditingText(node.name);
  }, []);

  const commitEdit = useCallback(
    async (node: MediaItem) => {
      const trimmed = editingText.trim();
      if (!trimmed || trimmed === node.name) {
        setEditingId(null);
        return;
      }

      setFolders((prev) =>
        prev.map((n) =>
          n.id === node.id
            ? { ...n, name: trimmed, path: slugify(trimmed) }
            : n
        )
      );
      setEditingId(null);

      try {
        await mediaService.update(node.id, {
          name: trimmed,
          path: slugify(trimmed),
          parentId: node.parentId,
        });
      } catch (err: any) {
        const msg = err?.response?.data?.message || err.message || "Failed to rename folder.";
        setError(msg);
        setFolders((prev) =>
          prev.map((n) => (n.id === node.id ? { ...n, name: node.name } : n))
        );
      }
    },
    [editingText]
  );

  const handleMove = useCallback(
    async (node: MediaItem, parentId: number | null) => {
      try {
        await mediaService.update(node.id, {
          parentId,
        });
        await fetchAll(); 
      } catch (err: any) {
        const msg = err?.response?.data?.message || err.message || "Failed to move folder.";
        setError(msg);
      }
    },
    [fetchAll]
  );

  const displayFolders = React.useMemo(() => {
    if (search.trim()) {
      return folders.filter((n) =>
        n.name.toLowerCase().includes(search.trim().toLowerCase())
      );
    }
    const roots = folders.filter((f) => f.parentId === null);
    const result: MediaItem[] = [];
    roots.forEach((root) => {
      result.push(root);
      const children = folders.filter((f) => f.parentId === root.id);
      result.push(...children);
    });
    return result;
  }, [folders, search]);

  return (
    <div className="flex flex-col gap-6 w-full h-full pb-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5 shadow-none border-0">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Media Directories</h1>
          <p className="text-sm font-medium text-gray-500 max-w-xl">
            Manage your application's media library. Create folders, upload images, and organize assets cleanly.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setAddingSubfolderTo(null);
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-all shadow-md shadow-yellow-400/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            <HiOutlinePlus size={18} strokeWidth={2} />
            Add Folder
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
        {/* Search Input Filter */}
        <div className="relative flex-1 group w-full">
          <HiOutlineSearch
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors pointer-events-none"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search folders quickly…"
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white border border-gray-200 text-sm font-medium text-gray-900 placeholder-gray-400 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all shadow-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-1 rounded-full transition-all"
            >
              <HiOutlineX size={14} />
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
             <div className="p-1.5 bg-red-100 text-red-600 rounded-lg">
                <HiOutlineExclamationCircle size={18} className="flex-shrink-0" />
             </div>
             <span className="font-medium">{error}</span>
          </div>
          <button
            className="text-red-400 hover:text-red-700 hover:bg-red-100 p-1.5 rounded-lg transition-colors"
            onClick={() => setError(null)}
          >
            <HiOutlineX size={16} />
          </button>
        </div>
      )}

      {/* Main Layout Area */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch flex-1">
        {/* Left Column: Folders */}
        <div className="w-full lg:w-[350px] shrink-0 flex flex-col bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden min-h-[400px]">
          {/* List Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-yellow-100 text-yellow-600">
                <HiOutlineFolderOpen size={18} strokeWidth={2} />
              </div>
              <span className="text-base font-bold text-gray-900">
                {loading
                  ? "Loading…"
                  : `Folders (${folders.length})`}
              </span>
            </div>
            {search && (
              <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100">
                {displayFolders.length} found
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-5 animate-pulse space-y-3">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded-xl w-full"></div>
                ))}
              </div>
            ) : displayFolders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-6 text-center h-full">
                <div className="p-5 rounded-full bg-gray-50 border border-gray-100 mb-4 text-gray-300">
                  <HiOutlineFolder size={40} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {search ? "No matches found" : "It's empty here"}
                </h3>
                <p className="text-sm text-gray-500 font-medium max-w-[200px]">
                  {search ? "Try checking for typos or clear your search." : "Start by creating a new folder to hold your assets."}
                </p>
                {!search && (
                  <button
                    onClick={() => {
                      setAddingSubfolderTo(null);
                      setShowAddModal(true);
                    }}
                    className="mt-6 text-sm py-2 px-4 rounded-xl border border-gray-200 font-bold bg-white text-gray-800 hover:border-gray-300 hover:shadow-sm transition-all shadow-sm"
                  >
                    Create Root Folder
                  </button>
                )}
              </div>
            ) : (
              <div className="py-3 px-3 space-y-1">
                {displayFolders.map((node) => {
                  const isEditing = editingId === node.id;
                  const isSelected = selectedFolderId === node.id;
                  const isSub = node.parentId !== null && (!search.trim());

                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedFolderId(node.id)}
                      className={`
                        group flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer
                        transition-all duration-200 border
                        ${isSelected 
                          ? "bg-yellow-50 border-yellow-200 shadow-sm" 
                          : "bg-transparent border-transparent hover:bg-gray-50 hover:border-gray-100"}
                        ${isSub ? "ml-8" : ""}
                      `}
                    >
                      {/* Sub-line visual indirection */}
                      {isSub && (
                        <div className="absolute -ml-6 w-3 h-[2px] bg-gray-200 rounded-full hidden lg:block" />
                      )}

                      <div className={`flex-shrink-0 transition-colors ${isSelected ? "text-yellow-500" : "text-gray-400 group-hover:text-gray-500"}`}>
                        {isSelected ? (
                          <HiOutlineFolderOpen size={24} className="drop-shadow-sm" />
                        ) : (
                          <HiOutlineFolder size={24} />
                        )}
                      </div>

                      {isEditing ? (
                        <div className="flex-1 min-w-0 pr-2">
                           <input
                            autoFocus
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            onBlur={() => commitEdit(node)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") commitEdit(node);
                              if (e.key === "Escape") setEditingId(null);
                            }}
                            className="w-full text-sm font-semibold rounded-lg px-2.5 py-1.5 bg-white border-2 border-yellow-400 outline-none text-gray-900 shadow-inner"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col flex-1 min-w-0 justify-center">
                          <span
                            className={`text-sm font-bold truncate transition-colors ${isSelected ? "text-yellow-900" : "text-gray-700"}`}
                            title={node.name}
                          >
                            {node.name}
                          </span>
                          <span className="text-[11px] font-medium text-gray-400 truncate tracking-wide">
                            /{node.path}
                          </span>
                        </div>
                      )}

                      {/* Actions */}
                      <div
                        className={`
                          flex items-center gap-1 flex-shrink-0
                          ${isEditing ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                          transition-all duration-200
                        `}
                        onClick={(e) => e.stopPropagation()}
                      >
                         {isEditing ? (
                          <>
                           {/* Using separate inline UI for editing save to keep space compact */}
                          </>
                        ) : (
                          <div className="flex bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden p-[2px]">
                            {node.parentId === null && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setAddingSubfolderTo(node);
                                  setShowAddModal(true);
                                }}
                                className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                                title="Add Subfolder"
                              >
                                <HiOutlineFolderAdd size={14} />
                              </button>
                            )}
                            <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMoveTarget(node);
                                }}
                                className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                                title="Move Folder"
                              >
                                <HiOutlineRefresh size={14} className="rotate-90" />
                              </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                startEdit(node);
                              }}
                              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                              title="Rename"
                            >
                              <HiOutlinePencil size={14} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteTarget(node);
                              }}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                              title="Delete"
                            >
                              <HiOutlineTrash size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Files Grid */}
        <div className="flex-1 w-full min-h-[400px]">
          <MediaFilesGrid folderId={selectedFolderId} />
        </div>
      </div>

      {showAddModal && (
        <AddFolderModal
          onClose={() => {
            setShowAddModal(false);
            setAddingSubfolderTo(null);
          }}
          onAdd={handleAdd}
          parentName={addingSubfolderTo?.name}
        />
      )}

      {moveTarget && (
        <MoveFolderModal
          node={moveTarget}
          folders={folders}
          onClose={() => setMoveTarget(null)}
          onMove={(parentId) => handleMove(moveTarget, parentId)}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          node={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => handleDelete(deleteTarget)}
        />
      )}
    </div>
  );
}
