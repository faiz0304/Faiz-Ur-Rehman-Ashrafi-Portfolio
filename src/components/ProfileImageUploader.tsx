"use client";

/**
 * ProfileImageUploader
 *
 * Drag-and-drop uploader or image URL paste input.
 * Saves the selected photo in the Zustand ResumeStore.
 * Auto-converts files to base64 so they can be saved locally in store state.
 */

import React, { useState, useRef, useCallback } from "react";
import { Upload, Link2, X, Image as ImageIcon, Check } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";

export function ProfileImageUploader() {
  const profileImageUrl = useResumeStore((s) => s.profileImageUrl);
  const setProfileImageUrl = useResumeStore((s) => s.setProfileImageUrl);

  const [urlInput, setUrlInput] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === "string") {
        setProfileImageUrl(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  }, [setProfileImageUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
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
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      setProfileImageUrl(urlInput.trim());
      setUrlInput("");
      setShowUrlInput(false);
    }
  };

  const handleRemove = () => {
    setProfileImageUrl(null);
    setUrlInput("");
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#0D0D0D] p-4 text-white">
      {/* Label header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-3.5 w-3.5 text-[#00F0FF]/60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
            Profile Photo
          </span>
        </div>
        {profileImageUrl && (
          <button
            onClick={handleRemove}
            className="font-mono text-[9px] uppercase tracking-wider text-red-400/60 hover:text-red-400 transition-colors flex items-center gap-0.5"
          >
            <X className="h-2.5 w-2.5" />
            Remove
          </button>
        )}
      </div>

      {profileImageUrl ? (
        /* State: Image Uploaded */
        <div className="flex items-center gap-4 rounded-lg border border-white/[0.04] bg-white/[0.01] p-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[#00F0FF]/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profileImageUrl}
              alt="Uploaded profile"
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <Check className="h-2.5 w-2.5" />
              Photo Loaded
            </span>
            <p className="mt-0.5 text-xs text-white/50 truncate font-mono">
              {profileImageUrl.startsWith("data:") ? "Local Image File" : profileImageUrl}
            </p>
            <button
              onClick={onButtonClick}
              className="mt-1.5 font-mono text-[9px] uppercase tracking-wider text-[#00F0FF]/60 hover:text-[#00F0FF] transition-colors"
            >
              Change Photo
            </button>
          </div>
        </div>
      ) : (
        /* State: Dropzone */
        <div className="space-y-3">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-5 px-3 text-center cursor-pointer transition-all duration-200
              ${dragActive
                ? "border-[#00F0FF] bg-[#00F0FF]/[0.02]"
                : "border-white/10 hover:border-white/20 bg-white/[0.01]"
              }`}
            onClick={onButtonClick}
          >
            <Upload className="mb-2 h-5 w-5 text-white/30" />
            <p className="font-mono text-[10px] text-white/70">
              Drag &amp; drop photo, or <span className="text-[#00F0FF]/80 underline">browse</span>
            </p>
            <p className="mt-1 font-mono text-[8px] text-white/30">
              PNG, JPG, or WEBP
            </p>
          </div>

          {/* Toggle URL input */}
          <div className="text-center">
            {showUrlInput ? (
              <form onSubmit={handleUrlSubmit} className="mt-2 flex items-center gap-2">
                <input
                  type="url"
                  placeholder="Paste profile photo URL..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 rounded border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[10px] text-white placeholder:text-white/20 outline-none focus:border-[#00F0FF]/30"
                  required
                />
                <button
                  type="submit"
                  className="rounded border border-[#00F0FF]/30 bg-[#00F0FF]/10 px-2.5 py-1.5 font-mono text-[10px] text-[#00F0FF] hover:bg-[#00F0FF]/20 transition-all shrink-0"
                >
                  Save
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowUrlInput(true)}
                className="font-mono text-[9px] text-white/30 hover:text-white/50 transition-colors flex items-center justify-center gap-1 mx-auto"
              >
                <Link2 className="h-2.5 w-2.5" />
                Or link photo from URL
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
