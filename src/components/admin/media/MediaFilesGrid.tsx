"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { mediaFileService, MediaFileItem } from "@/services/admin/mediaService";
import {
  HiOutlineUpload,
  HiOutlineTrash,
  HiOutlineDocument,
  HiOutlinePhotograph,
  HiOutlineEye,
  HiOutlineLink,
  HiOutlinePencil,
  HiCheck,
  HiX,
} from "react-icons/hi";

interface MediaFilesGridProps {
  folderId: number | null;
}

export default function MediaFilesGrid({ folderId }: MediaFilesGridProps) {
  const [files, setFiles] = useState<MediaFileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await mediaFileService.getList(1, 500, folderId);
      setFiles(resp.data);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "Failed to load files.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [folderId]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleUploadFiles = async (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    setUploading(true);
    setError(null);
    try {
      // Upload sequentially
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        await mediaFileService.create(file, file.name, folderId);
      }
      await fetchFiles();
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "Failed to upload file(s).";
      setError(msg);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUploadFiles(e.target.files);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadFiles(e.dataTransfer.files);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this file? This action cannot be undone.")) return;

    try {
      await mediaFileService.remove(id);
      setFiles((prev) => prev.filter((f) => f.id !== id));
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "Failed to delete file.";
      setError(msg);
    }
  };

  const handleRenameSubmit = async (file: MediaFileItem) => {
    const trimmed = editingName.trim();
    if (!trimmed || trimmed === file.name) {
      setEditingId(null);
      return;
    }

    // Optimistic UI updates
    setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, name: trimmed } : f)));
    setEditingId(null);

    try {
      await mediaFileService.update(file.id, { name: trimmed });
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "Failed to rename file.";
      setError(msg);
      // Revert optimism
      setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, name: file.name } : f)));
    }
  };

  const startRename = (file: MediaFileItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(file.id);
    setEditingName(file.name);
  };

  const copyLink = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    // You could show a small toast here if available.
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(url);
  };

  return (
    <div
      className={`relative bg-white rounded-3xl border shadow-sm flex flex-col h-full overflow-hidden transition-colors ${
        dragActive ? "border-yellow-400 bg-yellow-50/50" : "border-gray-200"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {/* Drag Overlay */}
      {dragActive && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-yellow-500/10 backdrop-blur-sm pointer-events-none rounded-3xl">
          <div className="bg-white px-8 py-6 rounded-2xl shadow-xl flex flex-col items-center gap-3 animate-in fade-in zoom-in duration-200">
            <div className="p-4 bg-yellow-100 text-yellow-600 rounded-full">
              <HiOutlineUpload size={32} />
            </div>
            <p className="text-lg font-bold text-gray-900">Drop files to upload</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0 bg-white/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-xl">
            <HiOutlinePhotograph className="text-gray-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">
              {folderId ? "Folder Contents" : "Root Files"}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {files.length} {files.length === 1 ? "file" : "files"}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <input
            type="file"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={onInputChange}
          />
          <button
            onClick={() => fetchFiles()}
            disabled={loading}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 px-3 py-2 transition-colors disabled:opacity-50"
          >
            Refresh
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <HiOutlineUpload size={18} className={uploading ? "animate-bounce" : ""} />
            {uploading ? "Uploading..." : "Upload Files"}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mx-6 mt-5 p-4 bg-red-50 text-red-600 rounded-2xl text-sm border border-red-100 flex items-center justify-between">
          <span className="font-medium">{error}</span>
          <button onClick={() => setError(null)} className="p-1 hover:bg-red-100 rounded-lg">
            <HiX size={16} />
          </button>
        </div>
      )}

      {/* Grid Content */}
      <div className="p-6 overflow-y-auto flex-1 bg-gray-50/30">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-yellow-400 rounded-full animate-spin"></div>
            <p className="text-sm font-medium">Loading files...</p>
          </div>
        ) : files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-sm mx-auto">
            <div className="p-6 bg-white shadow-sm rounded-full mb-6 border border-gray-100 text-gray-300">
              <HiOutlinePhotograph size={56} strokeWidth={1} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No files uploaded yet</h3>
            <p className="text-sm text-gray-500 mb-8">
              Drag and drop your media files here, or click the upload button to get started.
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
            >
              Select Files from Computer
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
            {files.map((file) => (
              <div
                key={file.id}
                className="group relative flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1"
                title={file.name}
              >
                {/* Preview Thumbnail */}
                <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden ring-1 ring-gray-200/50">
                  <img
                    src={file.file}
                    alt={file.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>';
                      (e.target as HTMLImageElement).className = "w-1/2 h-1/2 text-gray-300 object-contain";
                    }}
                  />

                  {/* Gradient Overlay for Actions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="flex items-center justify-center gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <button
                        onClick={() => window.open(file.file, "_blank")}
                        className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all shadow-sm"
                        title="View Full Size"
                      >
                        <HiOutlineEye size={18} />
                      </button>
                      <button
                        onClick={(e) => copyLink(file.file, e)}
                        className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all shadow-sm"
                        title="Copy URL"
                      >
                        <HiOutlineLink size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(file.id);
                        }}
                        className="w-10 h-10 bg-red-500/80 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all shadow-sm"
                        title="Delete File"
                      >
                        <HiOutlineTrash size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* File Metadata Details */}
                <div className="p-3 bg-white flex items-start gap-2 h-[60px]">
                  {editingId === file.id ? (
                    <div className="flex-1 flex gap-1">
                      <input
                        autoFocus
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="flex-1 min-w-0 text-xs px-2 py-1 border border-yellow-400 rounded outline-none focus:ring-1 focus:ring-yellow-400 bg-yellow-50/30"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleRenameSubmit(file);
                          if (e.key === "Escape") setEditingId(null);
                        }}
                      />
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleRenameSubmit(file)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                        >
                          <HiCheck size={14} />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-1 text-gray-400 hover:bg-gray-100 rounded"
                        >
                          <HiX size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
                        <p className="text-xs font-semibold text-gray-900 truncate" title={file.name}>
                          {file.name}
                        </p>
                        <p className="text-[10px] text-gray-400 truncate mt-0.5 uppercase tracking-wider">
                          {file.file.split(".").pop() || "unknown format"}
                        </p>
                      </div>
                      <button
                        onClick={(e) => startRename(file, e)}
                        className="p-1.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Rename"
                      >
                        <HiOutlinePencil size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
