"use client";

import { useState } from "react";
import {
  IoCalendarOutline,
  IoChevronForwardOutline,
  IoClipboardOutline,
} from "react-icons/io5";
import { GradingSelectionModal } from "@/components/grading/grading-selection-modal";
import { SelectedGradingForm } from "@/components/grading/selected-grading-form";
import { TemplateDownloadLink } from "@/components/template-download-link";
import {
  type GradingEquipmentType,
  gradingEquipmentOptions,
  useGradingPage,
} from "@/hooks/use-grading-page";

export function GradingPage() {
  const gradingPage = useGradingPage();
  const [downloadEquipmentType, setDownloadEquipmentType] =
    useState<GradingEquipmentType>(gradingEquipmentOptions[0].type);
  const isFormOpen = gradingPage.step === "form";

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
      {!isFormOpen ? (
        <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
          <div className="grid gap-8 p-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:p-8">
            <div>
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#036CB6] text-white">
                <IoClipboardOutline aria-hidden="true" className="text-2xl" />
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-wide text-[#036CB6]">
                Input Grading
              </p>
              <h1 className="mt-2 max-w-2xl text-3xl font-bold text-[#232122]">
                Mulai dari tanggal, lokasi, jenis peralatan, lalu nomor tag.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
                Sistem akan menampilkan form sesuai pilihan agar pengisian lebih
                mudah dan tidak tertukar.
              </p>
              <button
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-[#036CB6] px-5 text-sm font-semibold text-white transition hover:bg-[#025894]"
                onClick={gradingPage.startGrading}
                type="button"
              >
                Mulai input grading
                <IoChevronForwardOutline aria-hidden="true" className="text-lg" />
              </button>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-slate-50 p-5">
              <p className="text-sm font-bold text-[#232122]">Langkah input</p>
              <ol className="mt-4 space-y-3 text-sm text-neutral-700">
                <li className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-[#232122]">
                    1
                  </span>
                  Buka menu grading.
                </li>
                <li className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-[#232122]">
                    2
                  </span>
                  Pilih tanggal penilaian.
                </li>
                <li className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-[#232122]">
                    3
                  </span>
                  Pilih jenis peralatan.
                </li>
                <li className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-[#232122]">
                    4
                  </span>
                  Pilih nomor tag di dalam form.
                </li>
              </ol>
              <div className="mt-5 flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-3 text-sm text-neutral-600">
                <IoCalendarOutline
                  aria-hidden="true"
                  className="shrink-0 text-xl text-[#036CB6]"
                />
                Tanggal, lokasi, dan jenis peralatan dipakai saat data dikirim.
              </div>
            </div>
          </div>
        </section>
      ) : (
        <SelectedGradingForm
          assessmentDate={gradingPage.assessmentDate}
          onRestartFlow={gradingPage.restartFlow}
          onSelectedTagChange={gradingPage.setSelectedTag}
          selectedDepot={gradingPage.selectedDepot}
          selectedEquipment={gradingPage.selectedEquipment}
          selectedEquipmentOption={gradingPage.selectedEquipmentOption}
          selectedEquipmentType={gradingPage.selectedEquipmentType}
          selectedTag={gradingPage.selectedTag}
        />
      )}

      {!isFormOpen ? (
        <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px_auto] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#036CB6]">
                Template Lembar Fisik
              </p>
              <h2 className="mt-1 text-lg font-bold text-[#232122]">
                Unduh template grading untuk survei lapangan
              </h2>
              <p className="mt-1 text-sm leading-6 text-neutral-600">
                Pilih jenis peralatan, lalu unduh template yang dibutuhkan.
              </p>
            </div>

            <label>
              <span className="text-xs font-bold uppercase text-neutral-500">
                Jenis peralatan
              </span>
              <select
                className="mt-2 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm font-semibold text-[#232122] outline-none focus:border-[#036CB6] focus:ring-2 focus:ring-[#E6F1FA]"
                onChange={(event) =>
                  setDownloadEquipmentType(
                    event.target.value as GradingEquipmentType,
                  )
                }
                value={downloadEquipmentType}
              >
                {gradingPage.gradingEquipmentOptions.map((option) => (
                  <option key={option.type} value={option.type}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <TemplateDownloadLink
              className="h-10 border-[#036CB6] bg-white text-[#036CB6] hover:bg-[#E6F1FA]"
              equipmentType={downloadEquipmentType}
              kind="grading"
            >
              Unduh Template
            </TemplateDownloadLink>
          </div>
        </section>
      ) : null}

      <GradingSelectionModal
        assessmentDate={gradingPage.assessmentDate}
        depots={gradingPage.depots}
        equipmentOptions={gradingPage.gradingEquipmentOptions}
        isLoadingDepots={gradingPage.isLoadingDepots}
        isLoadingEquipment={gradingPage.isLoadingEquipment}
        onAssessmentDateChange={gradingPage.setAssessmentDate}
        onClose={gradingPage.closeModal}
        onDepotChange={gradingPage.setSelectedDepotId}
        onEquipmentTypeChange={gradingPage.selectEquipmentType}
        onSubmitDate={gradingPage.submitAssessmentDate}
        onSubmitLocation={gradingPage.submitLocation}
        onSubmitEquipment={gradingPage.submitEquipmentType}
        selectedDepotId={gradingPage.selectedDepotId}
        selectedEquipmentType={gradingPage.selectedEquipmentType}
        selectionError={gradingPage.selectionError}
        step={gradingPage.step}
      />
    </div>
  );
}
