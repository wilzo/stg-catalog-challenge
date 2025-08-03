"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Image as ImageIcon, Trash2 } from "lucide-react";
import {
  uploadImageToSupabase,
  deleteImageFromSupabase,
  updateProductImage,
  type UploadResult,
} from "@/lib/upload-images";

interface ImageUploadProps {
  productId?: number;
  productName?: string;
  currentImageUrl?: string;
  onUploadComplete?: (imageUrl: string) => void;
  className?: string;
}

export default function ImageUpload({
  productId,
  productName = "produto",
  currentImageUrl,
  onUploadComplete,
  className = "",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl || null
  );
  const [error, setError] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    setError(null);
    setUploading(true);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const result: UploadResult = await uploadImageToSupabase(
        file,
        productName
      );

      if (result.error) {
        setError(result.error);
        setPreviewUrl(currentImageUrl || null);
        return;
      }

      if (result.url) {
        setUploadedFileName(result.fileName || null);
        setPreviewUrl(result.url); // Atualizar preview com a nova URL

        // Apenas chamar o callback, sem atualizar o banco imediatamente
        onUploadComplete?.(result.url);
        console.log("✅ Upload concluído, alteração pendente:", result.url);
      }
    } catch {
      setError("Erro inesperado durante o upload");
      setPreviewUrl(currentImageUrl || null);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDeleteImage = async () => {
    if (!uploadedFileName) return;

    setUploading(true);
    try {
      const deleted = await deleteImageFromSupabase(uploadedFileName);
      if (deleted) {
        setPreviewUrl(null);
        setUploadedFileName(null);
        // Apenas chamar o callback, sem atualizar o banco imediatamente
        onUploadComplete?.("");
        console.log("✅ Imagem deletada, alteração pendente");
      }
    } catch {
      setError("Erro ao deletar imagem");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center
          ${
            uploading
              ? "border-blue-300 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }
          ${error ? "border-red-300 bg-red-50" : ""}
          transition-colors cursor-pointer
        `}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileInput}
          className="hidden"
        />

        {previewUrl ? (
          <div className="relative">
            <Image
              src={previewUrl}
              alt="Preview"
              width={256}
              height={256}
              className="max-w-full max-h-64 mx-auto rounded-lg object-contain"
            />
            {uploadedFileName && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteImage();
                }}
                disabled={uploading}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 disabled:opacity-50"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            {uploading ? (
              <>
                <Upload className="w-12 h-12 text-blue-500 animate-pulse" />
                <p className="text-blue-600 font-medium">Enviando imagem...</p>
              </>
            ) : (
              <>
                <ImageIcon className="w-12 h-12 text-gray-400" />
                <p className="text-gray-600">
                  Clique ou arraste uma imagem aqui
                </p>
                <p className="text-sm text-gray-400">
                  JPG, PNG ou WEBP • Máximo 5MB
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
          ❌ {error}
        </p>
      )}
    </div>
  );
}
