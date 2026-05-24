"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

type SubmissionKind = "grading" | "tasklist";

type SubmissionDetailPageProps = {
  id: string;
  kind: SubmissionKind;
};

type ApiEnvelope<T> = {
  data: T;
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:3001";

export function SubmissionDetailPage({ id, kind }: SubmissionDetailPageProps) {
  const [data, setData] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadDetail() {
      setIsLoading(true);
      setError("");

      try {
        const endpoint =
          kind === "grading"
            ? `${apiBaseUrl}/grading-submissions/${id}`
            : `${apiBaseUrl}/tasklists/${id}`;
        const response = await fetch(endpoint, { signal: controller.signal });
        const envelope = (await response.json()) as ApiEnvelope<unknown>;

        if (!response.ok) {
          throw new Error("Gagal memuat detail submission.");
        }

        setData(envelope.data);
      } catch (fetchError) {
        if (
          fetchError instanceof DOMException &&
          fetchError.name === "AbortError"
        ) {
          return;
        }
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Gagal memuat detail submission.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadDetail();

    return () => controller.abort();
  }, [id, kind]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
      <section className="rounded-lg border border-zinc-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-200 p-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-sky-700">
              Detail Submission
            </p>
            <h1 className="mt-1 text-2xl font-bold capitalize text-neutral-950">
              {kind}
            </h1>
          </div>
          <Link
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            href="/submissions"
          >
            <IoArrowBackOutline aria-hidden="true" className="text-lg" />
            Kembali
          </Link>
        </div>

        {error ? (
          <div className="border-b border-red-200 bg-red-50 px-5 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        ) : null}

        <div className="p-5">
          {isLoading ? (
            <p className="text-sm text-neutral-500">Memuat detail...</p>
          ) : (
            <pre className="max-h-[70vh] overflow-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      </section>
    </div>
  );
}
