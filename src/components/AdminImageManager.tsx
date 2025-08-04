"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";

interface AdminImageManagerProps {
  productId: number;
  productName: string;
  currentImageUrl: string;
  onImageUpdate: () => void;
}

export default function AdminImageManager({
  productId,
  productName,
  currentImageUrl,
  onImageUpdate,
}: AdminImageManagerProps) {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowUpload(!showUpload)}
        className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white"
      >
        <Upload size={14} />
      </Button>

      {showUpload && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white border-2 border-dashed border-blue-300 rounded-lg z-20">
          <ImageUpload
            onUploadComplete={() => {
              onImageUpdate();
              setShowUpload(false);
            }}
            className="h-full"
          />
        </div>
      )}
    </div>
  );
}
