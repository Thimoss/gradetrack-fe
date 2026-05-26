"use client";

import Image from "next/image";
import Link from "next/link";
import {
  IoClipboardOutline,
  IoDocumentTextOutline,
  IoHelpCircleOutline,
} from "react-icons/io5";
import { PageCard, PageHeader, PageShell } from "@/components/ui/page-section";

const guideImages = [
  {
    alt: "Sketsa titik pengambilan data generator",
    src: "/guide/gst-sketch.png",
    title: "Generator - Sketsa",
  },
  {
    alt: "Orientasi pengambilan data generator",
    src: "/guide/gst-orientasi.png",
    title: "Generator - Orientasi",
  },
  {
    alt: "Sketsa titik pengambilan data pompa",
    src: "/guide/pmp-sketch.png",
    title: "Pompa - Sketsa",
  },
  {
    alt: "Orientasi pengambilan data pompa",
    src: "/guide/pmp-orientasi.png",
    title: "Pompa - Orientasi",
  },
];

const quickLinks = [
  {
    description: "Mulai input hasil grading per equipment.",
    href: "/grading",
    icon: <IoClipboardOutline aria-hidden="true" />,
    label: "Form Grading",
  },
  {
    description: "Lihat status pengajuan grading dan tasklist.",
    href: "/submissions",
    icon: <IoDocumentTextOutline aria-hidden="true" />,
    label: "Pengajuan",
  },
];

export function BantuanPage() {
  return (
    <PageShell>
      <PageCard>
        <PageHeader
          description="Panduan singkat untuk pengambilan data lapangan dan akses cepat proses operasional."
          eyebrow="Bantuan"
          icon={<IoHelpCircleOutline aria-hidden="true" />}
          title="Pusat Bantuan"
        />
      </PageCard>

      <section className="grid gap-4 md:grid-cols-2">
        {quickLinks.map((item) => (
          <Link
            className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition hover:bg-slate-50"
            href={item.href}
            key={item.href}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#E6F1FA] text-xl text-[#036CB6]">
              {item.icon}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold text-[#232122]">
                {item.label}
              </span>
              <span className="mt-1 block text-sm text-neutral-600">
                {item.description}
              </span>
            </span>
          </Link>
        ))}
      </section>

      <PageCard>
        <div className="border-b border-zinc-200 px-5 py-4">
          <h2 className="text-base font-bold text-[#232122]">
            Pengambilan Data Lapangan
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            Referensi titik pengambilan data untuk generator dan pompa.
          </p>
        </div>
        <div className="grid gap-4 p-5 md:grid-cols-2">
          {guideImages.map((guide) => (
            <figure
              className="rounded-lg border border-zinc-200 bg-slate-50 p-4"
              key={guide.src}
            >
              <figcaption className="text-sm font-bold uppercase tracking-wide text-neutral-700">
                {guide.title}
              </figcaption>
              <div className="mt-3 flex min-h-64 items-center justify-center">
                <Image
                  alt={guide.alt}
                  className="h-auto w-full max-w-[640px]"
                  height={360}
                  priority={guide.src === "/guide/gst-sketch.png"}
                  src={guide.src}
                  width={640}
                />
              </div>
            </figure>
          ))}
        </div>
      </PageCard>
    </PageShell>
  );
}
