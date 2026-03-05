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
  HiOutlineChevronRight,
  HiOutlineChevronDown,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import { mediaService, MediaItem } from "@/services/admin/mediaService";

// ─── Tree Node Data ────────────────────────────────────────────────────────────

interface NodeData {
  path: string;
  parentId: number | null;
}

type MediaNode = NodeModel<NodeData>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function flatToTree(items: MediaItem[]): MediaNode[] {
  return items.map((item) => {
    // parentId may be absent from the API response — treat missing/null/0 as root
    const parentId: number | null =
      item.parentId != null && item.parentId !== 0 ? item.parentId : null;
    return {
      id: item.id,
      parent: parentId ?? 0,   // tree library uses 0 for root
      droppable: true,
      text: item.name,
      data: { path: item.path, parentId },
    };
  });
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ─── Custom Drag Preview ───────────────────────────────────────────────────────

function DragPreview({ monitorProps }: { monitorProps: DragLayerMonitorProps<NodeData> }) {
  const { item } = monitorProps;
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-400 text-gray-900 shadow-xl text-sm font-semibold opacity-90 pointer-events-none">
      <HiOutlineFolder size={16} />
      {item?.text}
    </div>
  );
}

// ─── Add Folder Modal ──────────────────────────────────────────────────────────

interface AddFolderModalProps {
  parentNode?: MediaNode | null;
  onClose: () => void;
  onAdd: (name: string, parentId: number | null) => Promise<void>;
}

function AddFolderModal({ parentNode, onClose, onAdd }: AddFolderModalProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Folder name cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      await onAdd(trimmed, parentNode ? (parentNode.id as number) : null);
      onClose();
    } catch {
      setError("Failed to create folder. Please try again.");
    } finally {
      setLoading(false);
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
              <HiOutlineFolderOpen size={18} className="text-yellow-400" />
            </div>
            <h2 className="text-base font-semibold text-white">
              {parentNode ? `Add inside "${parentNode.text}"` : "Add Root Folder"}
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
              ref={inputRef}
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
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold bg-yellow-400 text-gray-900 hover:bg-yellow-300 disabled:opacity-50 transition-colors"
            >
              {loading ? "Creating…" : "Create Folder"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ──────────────────────────────────────────────────────

interface DeleteConfirmProps {
  node: MediaNode;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

function DeleteConfirmModal({ node, onClose, onConfirm }: DeleteConfirmProps) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setLoading(false);
    }
  }

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
              Delete{" "}
              <span className="text-white font-medium">"{node.text}"</span>?
              This action cannot be undone.
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
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-400 disabled:opacity-50 transition-colors"
            >
              {loading ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Skeleton Loader ──────────────────────────────────────────────────────────

function SkeletonRow({ depth = 0 }: { depth?: number }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 animate-pulse"
      style={{ paddingLeft: `${16 + depth * 24}px` }}
    >
      <div className="w-4 h-4 rounded bg-white/10" />
      <div className="w-4 h-4 rounded bg-white/10" />
      <div className="h-3 rounded bg-white/10" style={{ width: `${60 + 8 * 120}px` }} />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MediaDirectoryManager() {
  const [treeData, setTreeData] = useState<MediaNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [addParent, setAddParent] = useState<MediaNode | null | undefined>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaNode | null>(null);

  // Inline edit
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  // ─── Fetch ───────────────────────────────────────────────────────────────────

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await mediaService.getAll();
      setTreeData(flatToTree(items));
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to load media directories.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ─── Add ──────────────────────────────────────────────────────────────────────

  const handleAdd = useCallback(
    async (name: string, parentId: number | null) => {
      const path = slugify(name);
      // parentId is the caller-supplied value — use directly, don't rely on API echo
      const created = await mediaService.create(name, path, parentId);

      const newNode: MediaNode = {
        id: created.id,
        parent: parentId ?? 0,
        droppable: true,
        text: created.name,
        data: {
          path: created.path ?? path,
          parentId,
        },
      };
      setTreeData((prev) => [...prev, newNode]);
    },
    []
  );

  // ─── Delete ───────────────────────────────────────────────────────────────────

  const handleDelete = useCallback(async (node: MediaNode) => {
    const id = node.id as number;

    // Optimistic: remove node and all descendants
    setTreeData((prev) => {
      const toRemove = new Set<number>();
      const collect = (pid: number) => {
        prev.forEach((n) => {
          if (n.parent === pid) {
            toRemove.add(n.id as number);
            collect(n.id as number);
          }
        });
      };
      toRemove.add(id);
      collect(id);
      return prev.filter((n) => !toRemove.has(n.id as number));
    });

    try {
      await mediaService.remove(id);
    } catch {
      // Revert on failure
      await fetchAll();
    }
  }, [fetchAll]);

  // ─── Rename ───────────────────────────────────────────────────────────────────

  const startEdit = useCallback((node: MediaNode) => {
    setEditingId(node.id as number);
    setEditingText(node.text);
  }, []);

  const commitEdit = useCallback(
    async (node: MediaNode) => {
      const trimmed = editingText.trim();
      if (!trimmed || trimmed === node.text) {
        setEditingId(null);
        return;
      }

      // Derive parentId from node.parent (authoritative tree field),
      // not from node.data.parentId which may be stale/null.
      const parentId: number | null =
        node.parent !== 0 ? (node.parent as number) : null;

      // Optimistic
      setTreeData((prev) =>
        prev.map((n) =>
          n.id === node.id
            ? { ...n, text: trimmed, data: { ...n.data!, path: slugify(trimmed), parentId } }
            : n
        )
      );
      setEditingId(null);

      try {
        await mediaService.update(node.id as number, {
          name: trimmed,
          path: slugify(trimmed),
          parentId,
        });
      } catch {
        // Revert
        setTreeData((prev) =>
          prev.map((n) => (n.id === node.id ? { ...n, text: node.text } : n))
        );
      }
    },
    [editingText]
  );

  // ─── Drag & Drop ─────────────────────────────────────────────────────────────

  const handleDrop = useCallback(
    async (
      newTree: MediaNode[],
      { dragSourceId, dropTargetId }: { dragSourceId: number | string; dropTargetId: number | string }
    ) => {
      const oldTree = treeData;

      // newParentId is null when dropped at root (dropTargetId === 0)
      const newParentId: number | null =
        dropTargetId === 0 ? null : (dropTargetId as number);

      // Sync data.parentId on the dragged node so subsequent operations
      // (rename, further drags) always have the correct parentId.
      const syncedTree = newTree.map((n) =>
        n.id === dragSourceId
          ? { ...n, data: { ...n.data!, parentId: newParentId } }
          : n
      );

      // Optimistic update with synced data
      setTreeData(syncedTree);

      const draggedNode = syncedTree.find((n) => n.id === dragSourceId);
      if (!draggedNode) return;

      try {
        await mediaService.update(dragSourceId as number, {
          name: draggedNode.text,
          path: slugify(draggedNode.text),
          parentId: newParentId,
        });
      } catch {
        // Revert on API failure
        setTreeData(oldTree);
      }
    },
    [treeData]
  );

  // ─── Filtered Tree ───────────────────────────────────────────────────────────

  const filteredTree = search.trim()
    ? treeData.filter((n) =>
        n.text.toLowerCase().includes(search.trim().toLowerCase())
      )
    : treeData;

  // When searching, flatten everything under root so it's visible
  const displayTree: MediaNode[] = search.trim()
    ? filteredTree.map((n) => ({ ...n, parent: 0 }))
    : filteredTree;

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <div className="min-h-full space-y-6">
        {/* ── Page Header ── */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-900">Media Directories</h1>
          <p className="text-sm text-gray-500">
            Manage folder structure for your media library. Drag to reorder or
            nest folders.
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
              onClick={() => {
                setAddParent(null);
                setShowAddModal(true);
              }}
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

        {/* ── Tree Card ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <HiOutlineFolderOpen size={18} className="text-yellow-500" />
              <span className="text-sm font-semibold text-gray-700">
                {loading
                  ? "Loading…"
                  : `${treeData.length} folder${treeData.length !== 1 ? "s" : ""}`}
              </span>
            </div>
            {search && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <HiOutlineInformationCircle size={13} />
                Showing {displayTree.length} result
                {displayTree.length !== 1 ? "s" : ""} for "{search}"
              </span>
            )}
          </div>

          {/* Tree Body */}
          <div className="min-h-[200px]">
            {loading ? (
              <div className="py-2">
                {[0, 0, 1, 0, 2, 1, 0].map((d, i) => (
                  <SkeletonRow key={i} depth={d} />
                ))}
              </div>
            ) : displayTree.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="p-4 rounded-full bg-gray-50 mb-3">
                  <HiOutlineFolder size={28} className="text-gray-300" />
                </div>
                <p className="text-sm font-medium text-gray-500">
                  {search ? "No folders match your search" : "No folders yet"}
                </p>
                {!search && (
                  <button
                    onClick={() => {
                      setAddParent(null);
                      setShowAddModal(true);
                    }}
                    className="mt-3 text-xs text-yellow-600 hover:text-yellow-700 font-medium"
                  >
                    + Create your first folder
                  </button>
                )}
              </div>
            ) : (
              <Tree<NodeData>
                tree={displayTree}
                rootId={0}
                onDrop={handleDrop as (tree: NodeModel<NodeData>[], options: { dragSourceId: NodeModel<NodeData>["id"]; dropTargetId: NodeModel<NodeData>["id"]; dragSource: NodeModel<NodeData> | null; dropTarget: NodeModel<NodeData> | null; }) => void}
                canDrop={(tree, { dropTargetId }) => dropTargetId === 0}
                dragPreviewRender={(monitorProps) => (
                  <DragPreview monitorProps={monitorProps} />
                )}
                classes={{
                  root: "w-full py-1",
                  container: "w-full",
                  draggingSource: "opacity-40",
                  dropTarget: "bg-yellow-50 border-l-2 border-yellow-400",
                }}
                render={(node, { depth, isOpen, onToggle }) => {
                  const isEditing = editingId === (node.id as number);
                  const hasChildren = displayTree.some((n) => n.parent === node.id);

                  return (
                    <div
                      className={`
                        group flex items-center gap-2 px-4 py-2.5 cursor-pointer
                        hover:bg-gray-50 transition-colors rounded-none
                        border-b border-gray-50 last:border-none
                      `}
                      style={{ paddingLeft: `${16 + depth * 24}px` }}
                    >
                      {/* Toggle chevron */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggle();
                        }}
                        className={`
                          flex-shrink-0 text-gray-400 hover:text-gray-700 transition-colors
                          ${!hasChildren && !node.droppable ? "invisible" : ""}
                        `}
                        style={{ width: 16 }}
                        tabIndex={-1}
                      >
                        {isOpen ? (
                          <HiOutlineChevronDown size={13} />
                        ) : (
                          <HiOutlineChevronRight size={13} />
                        )}
                      </button>

                      {/* Folder icon */}
                      <div className="flex-shrink-0 text-yellow-500">
                        {isOpen ? (
                          <HiOutlineFolderOpen size={17} />
                        ) : (
                          <HiOutlineFolder size={17} />
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
                          className="flex-1 text-sm rounded px-2 py-0.5 bg-white border border-yellow-400 ring-1 ring-yellow-400 text-gray-900 outline-none"
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <span
                          className="flex-1 text-sm text-gray-800 truncate select-none"
                          title={node.text}
                        >
                          {node.text}
                        </span>
                      )}

                      {/* Path badge */}
                      {!isEditing && (
                        <span className="hidden sm:block text-[11px] text-gray-400 truncate max-w-[140px]">
                          {node.data?.path}
                        </span>
                      )}

                      {/* Action buttons */}
                      <div
                        className={`
                          flex items-center gap-1 flex-shrink-0
                          ${isEditing ? "flex" : "opacity-0 group-hover:opacity-100"}
                          transition-opacity
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
                            {/* Only show "Add subfolder" if it's a root folder (depth === 0) */}
                            {depth === 0 && (
                              <button
                                onClick={() => {
                                  setAddParent(node);
                                  setShowAddModal(true);
                                }}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 transition-colors"
                                title="Add subfolder"
                              >
                                <HiOutlinePlus size={13} />
                              </button>
                            )}
                            <button
                              onClick={() => startEdit(node)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              title="Rename"
                            >
                              <HiOutlinePencil size={13} />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(node)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete"
                            >
                              <HiOutlineTrash size={13} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                }}
              />
            )}
          </div>
        </div>

        {/* ── Tip ── */}
        {!loading && treeData.length > 0 && !search && (
          <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1.5">
            <HiOutlineInformationCircle size={13} />
            Drag folders to reorder them or drag one folder into another to create a single-level structure.
          </p>
        )}
      </div>

      {/* ── Modals ── */}
      {showAddModal && (
        <AddFolderModal
          parentNode={addParent}
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
    </DndProvider>
  );
}
