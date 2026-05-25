"use client";

import Image from "next/image";
import { useState } from "react";
import { GradingFormSection } from "./grading-form-section";

type DocumentationImage = {
  id: string;
  name: string;
  previewUrl?: string;
};

const documentationSlots = [
  "Foto peralatan 1",
  "Foto peralatan 2",
  "Foto peralatan 3",
  "Foto peralatan 4",
];

export function GeneratorDocumentationSection() {
  const [images, setImages] = useState<Record<number, DocumentationImage>>({});

  return (
    <GradingFormSection title="Dokumentasi Peralatan">
      <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
        {documentationSlots.map((label, index) => {
          const image = images[index];
          const inputId = `documentation-image-${index}`;

          return (
            <label
              key={label}
              className="relative flex aspect-[2.08/1] cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-slate-300 bg-slate-50 text-sm font-semibold text-slate-600 outline-none transition hover:border-[#036CB6] hover:bg-[#E6F1FA] focus-within:ring-2 focus-within:ring-[#036CB6]"
              htmlFor={inputId}
            >
              {image?.previewUrl ? (
                <Image
                  src={image.previewUrl}
                  alt={image.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <span>{label}</span>
              )}
              <input
                accept="image/*"
                className="sr-only"
                id={inputId}
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (!file) {
                    return;
                  }

                  setImages((current) => ({
                    ...current,
                    [index]: {
                      id: `${file.name}-${file.lastModified}`,
                      name: file.name,
                      previewUrl: URL.createObjectURL(file),
                    },
                  }));
                }}
                type="file"
              />
            </label>
          );
        })}
      </div>
    </GradingFormSection>
  );
}
