"use client";

import {
  IoCalendarOutline,
  IoChevronForwardOutline,
  IoClipboardOutline,
} from "react-icons/io5";
import { GradingSelectionModal } from "@/components/grading/grading-selection-modal";
import { SelectedGradingForm } from "@/components/grading/selected-grading-form";
import { useGradingPage } from "@/hooks/use-grading-page";

export function GradingPage() {
  const gradingPage = useGradingPage();
  const isFormOpen = gradingPage.step === "form";

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
      {!isFormOpen ? (
        <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
          <div className="grid gap-8 p-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:p-8">
            <div>
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-slate-950 text-white">
                <IoClipboardOutline aria-hidden="true" className="text-2xl" />
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-wide text-sky-700">
                Grading Workflow
              </p>
              <h1 className="mt-2 max-w-2xl text-3xl font-bold text-neutral-950">
                Input grading dimulai dari tanggal, jenis equipment, lalu nomor
                tag.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
                Flow ini menyiapkan konteks penilaian sebelum form dibuka supaya
                form yang tampil sesuai equipment yang dipilih.
              </p>
              <button
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
                onClick={gradingPage.startGrading}
                type="button"
              >
                Input Grading
                <IoChevronForwardOutline aria-hidden="true" className="text-lg" />
              </button>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-slate-50 p-5">
              <p className="text-sm font-bold text-neutral-950">Alur input</p>
              <ol className="mt-4 space-y-3 text-sm text-neutral-700">
                <li className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-slate-950">
                    1
                  </span>
                  User membuka menu grading.
                </li>
                <li className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-slate-950">
                    2
                  </span>
                  Pilih tanggal penilaian.
                </li>
                <li className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-slate-950">
                    3
                  </span>
                  Pilih jenis equipment.
                </li>
                <li className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-slate-950">
                    4
                  </span>
                  Pilih nomor tag di dalam form.
                </li>
              </ol>
              <div className="mt-5 flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-3 text-sm text-neutral-600">
                <IoCalendarOutline
                  aria-hidden="true"
                  className="shrink-0 text-xl text-sky-700"
                />
                Tanggal dan jenis equipment akan dipakai sebagai konteks submit.
              </div>
            </div>
          </div>
        </section>
      ) : (
        <SelectedGradingForm
          assessmentDate={gradingPage.assessmentDate}
          onRestartFlow={gradingPage.restartFlow}
          onSelectedTagChange={gradingPage.setSelectedTag}
          selectedEquipmentOption={gradingPage.selectedEquipmentOption}
          selectedEquipmentType={gradingPage.selectedEquipmentType}
          selectedTag={gradingPage.selectedTag}
        />
      )}

      <GradingSelectionModal
        assessmentDate={gradingPage.assessmentDate}
        equipmentOptions={gradingPage.gradingEquipmentOptions}
        onAssessmentDateChange={gradingPage.setAssessmentDate}
        onClose={gradingPage.closeModal}
        onEquipmentTypeChange={gradingPage.selectEquipmentType}
        onSubmitDate={gradingPage.submitAssessmentDate}
        onSubmitEquipment={gradingPage.submitEquipmentType}
        selectedEquipmentType={gradingPage.selectedEquipmentType}
        step={gradingPage.step}
      />
    </div>
  );
}
