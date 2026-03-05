"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { mediaFileService, MediaFileItem } from "@/services/admin/mediaService";
import { HiOutlineUpload, HiOutlineTrash, HiOutlineDocument, HiOutlinePhotograph } from "react-icons/hi";

interface MediaFilesGridProps {
  folderId: number | null;
}

export default function MediaFilesGrid({ folderId }: MediaFilesGridProps) {
  const [files, setFiles] = useState<MediaFileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    setUploading(true);
    setError(null);
    try {
      // Upload sequentially for simplicity, could be parallelized
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

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    
    try {
      await mediaFileService.remove(id);
      setFiles((prev) => prev.filter((f) => f.id !== id));
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "Failed to delete file.";
      setError(msg);
    }
  };

  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(url);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full min-h-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-gray-800">
            {folderId ? "Folder Contents" : "Root Files"}
          </h2>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {files.length}
          </span>
        </div>
        
        <div className="flex gap-2">
          <input 
            type="file" 
            multiple 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 transition shadow-sm"
          >
            <HiOutlineUpload size={16} className={uploading ? "animate-bounce" : ""} />
            {uploading ? "Uploading..." : "Upload Files"}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="m-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
          {error}
        </div>
      )}

      {/* Grid Content */}
      <div className="p-5 overflow-y-auto flex-1">
        {loading ? (
          <div className="flex items-center justify-center h-full text-sm text-gray-400 shadow-inner rounded-xl bg-gray-50">
            Loading files...
          </div>
        ) : files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gray-50 rounded-xl dashed border-2 border-gray-200">
            <HiOutlinePhotograph size={48} className="text-gray-300 mb-3" />
            <p className="text-sm font-medium text-gray-600">This folder is empty</p>
            <p className="text-xs text-gray-400 mt-1">Upload files to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {files.map((file) => (
              <div 
                key={file.id} 
                className="group relative flex flex-col bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 aspect-square"
                title={file.name}
              >
                {/* Preview */}
                <div className="flex-1 bg-gray-100 flex items-center justify-center p-2 relative">
                  {isImage(file.file) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={file.file} 
                      alt={file.name} 
                      className="object-contain w-full h-full"
                      loading="lazy"
                    />
                  ) : (
                    <HiOutlineDocument size={32} className="text-gray-400" />
                  )}
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => window.open(file.file, '_blank')}
                      className="p-2 bg-white rounded-lg text-gray-700 hover:text-blue-600 transition shadow-sm"
                      title="Open in new tab"
                    >
                      <HiOutlineDocument size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="p-2 bg-white rounded-lg text-gray-700 hover:text-red-600 transition shadow-sm"
                      title="Delete file"
                    >
                      <HiOutlineTrash size={16} />
                    </button>
                  </div>
                </div>
                
                {/* Label */}
                <div className="px-3 py-2 bg-white border-t border-gray-100 truncate text-[11px] font-medium text-gray-600 text-center">
                  {file.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
