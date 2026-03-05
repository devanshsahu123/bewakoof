"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  FormEvent,
} from "react";
import {
  Tree,
  MultiBackend,
  getBackendOptions,
  NodeModel,
  DragLayerMonitorProps,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
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

// ─── Interfaces ───────────────────────────────────────────────────────────────

// We no longer need the tree structure, so we just use MediaItem array directly.
// But for consistency with the rest of the code that expects an `id` and `text`,
// we can keep a simple wrapper or just use the raw items.

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
}

function AddFolderModal({ onClose, onAdd }: AddFolderModalProps) {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-yellow-400/10">
              <HiOutlineFolderAdd size={18} className="text-yellow-400" />
            </div>
            <h2 className="text-base font-semibold text-white">
              Add Root Folder
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <HiOutlineX size={16} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5">
              Folder Name
            </label>
            <input
            type="text"
            required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="e.g. Products Images"
              className="w-full px-3 py-2.5 rounded-lg bg-gray-700 border border-white/10 text-white text-sm placeholder-white/30 outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition"
            />
            {error && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                <HiOutlineExclamationCircle size={12} />
                {error}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold bg-yellow-400 text-gray-900 hover:bg-yellow-300 disabled:opacity-50 transition-colors"
            >
              {submitting ? "Creating…" : "Create Folder"}
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-sm bg-gray-800 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
        <div className="px-6 pt-6 pb-5 space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-red-500/10">
              <HiOutlineTrash size={24} className="text-red-400" />
            </div>
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-base font-semibold text-white">Delete Folder</h2>
            <p className="text-sm text-white/50">
              Are you sure you want to delete{" "}
              <span className="text-white font-medium">"{node.name}"</span>?
              This will also delete any files inside it. This action cannot be
              undone.
            </p>
          </div>
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                setDeleting(true);
                await onConfirm();
              }}
              disabled={deleting}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-400 disabled:opacity-50 transition-colors"
            >
              {deleting ? "Deleting…" : "Delete"}
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

  // Selected folder for showing files
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);

  // Inline edit
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);

  // ─── Fetch ───────────────────────────────────────────────────────────────────

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await mediaService.getAll();
      setFolders(items);
      // Optional: automatically select the first folder if none selected
      if (items.length > 0 && selectedFolderId === null) {
        setSelectedFolderId(items[0].id);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to load media directories.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [selectedFolderId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ─── Add ──────────────────────────────────────────────────────────────────────

  const handleAdd = useCallback(
    async (name: string) => {
      const path = slugify(name);
      // Always create at root level (null parent)
      const created = await mediaService.create(name, path, null);
      setFolders((prev) => [...prev, created]);
      setSelectedFolderId(created.id); // Auto-select new folder
    },
    []
  );

  // ─── Delete ───────────────────────────────────────────────────────────────────

  const handleDelete = useCallback(async (node: MediaItem) => {
    const id = node.id;

    // Optimistic: remove node
    setFolders((prev) => prev.filter((n) => n.id !== id));
    if (selectedFolderId === id) setSelectedFolderId(null);

    try {
      await mediaService.remove(id);
    } catch (err: any) {
      // Revert on failure
      const msg = err?.response?.data?.message || err.message || "Failed to delete folder.";
      setError(msg);
      await fetchAll();
    }
  }, [fetchAll, selectedFolderId]);

  // ─── Rename ───────────────────────────────────────────────────────────────────

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

      // Optimistic
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
          parentId: null, // Always root
        });
      } catch (err: any) {
        // Revert on failure
        const msg = err?.response?.data?.message || err.message || "Failed to rename folder.";
        setError(msg);
        setFolders((prev) =>
          prev.map((n) => (n.id === node.id ? { ...n, name: node.name } : n))
        );
      }
    },
    [editingText]
  );

  // ─── Filtered Folders ────────────────────────────────────────────────────────

  const displayFolders = search.trim()
    ? folders.filter((n) =>
        n.name.toLowerCase().includes(search.trim().toLowerCase())
      )
    : folders;

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-full space-y-6">
        {/* ── Page Header ── */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-900">Media Directories</h1>
          <p className="text-sm text-gray-500">
            Select a folder on the left to manage its files on the right.
          </p>
        </div>

        {/* ── Toolbar ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <HiOutlineSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search folders…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <HiOutlineX size={14} />
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={fetchAll}
              disabled={loading}
              title="Refresh"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition shadow-sm"
            >
              <HiOutlineRefresh
                size={15}
                className={loading ? "animate-spin" : ""}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition shadow-sm"
            >
              <HiOutlinePlus size={16} />
              Add Folder
            </button>
          </div>
        </div>

        {/* ── Error Banner ── */}
        {error && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            <HiOutlineExclamationCircle size={18} className="flex-shrink-0" />
            <span>{error}</span>
            <button
              className="ml-auto text-red-400 hover:text-red-600"
              onClick={() => setError(null)}
            >
              <HiOutlineX size={14} />
            </button>
          </div>
        )}

        {/* ── Split Layout ── */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* ── Left Column: Tree Card ── */}
          <div className="w-full lg:w-[35%] shrink-0 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[500px]">
          {/* Card Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex flex-col items-center gap-2">
              <HiOutlineFolderOpen size={18} className="text-yellow-500" />
              <span className="text-sm font-semibold text-gray-700">
                {loading
                  ? "Loading…"
                  : `${folders.length} folder${folders.length !== 1 ? "s" : ""}`}
              </span>
            </div>
            {search && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <HiOutlineExclamationCircle size={13} />
                Showing {displayFolders.length} result
                {displayFolders.length !== 1 ? "s" : ""} for "{search}"
              </span>
            )}
          </div>

          {/* Folder List Body */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="py-2 animate-pulse space-y-2 px-3">
                <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
                <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
                <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
                <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
              </div>
            ) : displayFolders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="p-4 rounded-full bg-gray-50 mb-3">
                  <HiOutlineFolder size={28} className="text-gray-300" />
                </div>
                <p className="text-sm font-medium text-gray-500">
                  {search ? "No folders match your search" : "No folders yet"}
                </p>
                {!search && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="mt-3 text-xs text-yellow-600 hover:text-yellow-700 font-medium"
                  >
                    + Create your first folder
                  </button>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {displayFolders.map((node) => {
                  const isEditing = editingId === node.id;
                  
                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedFolderId(node.id)}
                      className={`
                        group flex items-center gap-3 px-5 py-3.5 cursor-pointer
                        hover:bg-gray-50 transition-colors
                        ${selectedFolderId === node.id ? "bg-yellow-50 hover:bg-yellow-50 border-l-2 border-yellow-400" : "border-l-2 border-transparent"}
                      `}
                    >
                      {/* Folder icon */}
                      <div className="flex-shrink-0 text-yellow-500">
                        {selectedFolderId === node.id ? (
                          <HiOutlineFolderOpen size={20} />
                        ) : (
                          <HiOutlineFolder size={20} />
                        )}
                      </div>

                      {/* Name / Edit input */}
                      {isEditing ? (
                        <input
                          autoFocus
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onBlur={() => commitEdit(node)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") commitEdit(node);
                            if (e.key === "Escape") setEditingId(null);
                          }}
                          className="flex-1 text-sm rounded px-3 py-1 bg-white border border-yellow-400 ring-1 ring-yellow-400 text-gray-900 outline-none"
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <div className="flex flex-col flex-1 min-w-0">
                          <span
                            className={`text-sm font-medium truncate ${selectedFolderId === node.id ? "text-yellow-900" : "text-gray-800"}`}
                            title={node.name}
                          >
                            {node.name}
                          </span>
                          <span className="text-[11px] text-gray-400 truncate">
                            /{node.path}
                          </span>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div
                        className={`
                          flex items-center gap-1 flex-shrink-0
                          ${isEditing ? "flex" : "opacity-0 group-hover:opacity-100"}
                          transition-opacity focus-within:opacity-100
                        `}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => commitEdit(node)}
                              className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
                              title="Save"
                            >
                              <HiOutlineCheck size={14} />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                              title="Cancel"
                            >
                              <HiOutlineX size={14} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                startEdit(node);
                              }}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors focus:opacity-100"
                              title="Rename"
                            >
                              <HiOutlinePencil size={15} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteTarget(node);
                              }}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors focus:opacity-100"
                              title="Delete"
                            >
                              <HiOutlineTrash size={15} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* ── Tip ── */}
          {!loading && folders.length > 0 && !search && (
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
              <p className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-1">
                <HiOutlineExclamationCircle size={13} />
                Click a folder to view and upload files.
              </p>
            </div>
          )}
        </div>

        {/* ── Right Column: Files Grid ── */}
        <div className="w-full lg:w-[65%] min-h-[500px]">
          <MediaFilesGrid folderId={selectedFolderId} />
        </div>
      </div>

      {/* ── Modals ── */}
      {showAddModal && (
        <AddFolderModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAdd}
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
