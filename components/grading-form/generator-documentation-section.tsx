"use client";

import Image from "next/image";
import { useState } from "react";

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
    <section className="border-b border-neutral-300 bg-white">
      <h2 className="px-1 text-lg font-bold uppercase leading-8 text-neutral-950">
        Dokumentasi Peralatan
      </h2>
      <div className="grid grid-cols-2 gap-x-24 gap-y-8 px-10 pb-8 pt-5 max-lg:gap-x-10 max-md:grid-cols-1 max-md:px-4">
        {documentationSlots.map((label, index) => {
          const image = images[index];
          const inputId = `documentation-image-${index}`;

          return (
            <label
              key={label}
              className="relative flex aspect-[2.08/1] cursor-pointer items-center justify-center border border-neutral-300 bg-blue-100 text-sm font-medium text-neutral-600 outline-none focus-within:ring-2 focus-within:ring-blue-500"
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
    </section>
  );
}
