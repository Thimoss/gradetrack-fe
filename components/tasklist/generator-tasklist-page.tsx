"use client";

import { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { GeneratorTasklistEquipmentSection } from "@/components/tasklist/generator-tasklist-equipment-section";
import { GeneratorTasklistHeaderSection } from "@/components/tasklist/generator-tasklist-header-section";
import { TasklistSelectionFlow } from "@/components/tasklist/tasklist-selection-flow";
import {
  type GeneratorTasklistCycle,
  useGeneratorTasklistPage,
} from "@/hooks/use-generator-tasklist-page";

const cycleLabel: Record<GeneratorTasklistCycle, string> = {
  WEEKLY: "Mingguan",
  MONTHLY: "Bulanan",
  SIX_MONTHLY: "6 Bulanan",
  YEARLY: "Tahunan",
};

export function GeneratorTasklistPage() {
  const tasklistPage = useGeneratorTasklistPage();
  const [submitMessage, setSubmitMessage] = useState("");

  function scrollToTask(taskId: string) {
    window.requestAnimationFrame(() => {
      document
        .getElementById(`tasklist-task-${taskId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
  const {
    equipmentCount,
    taskCount,
    totalTasklistPlan,
    totalTasklistSelesai,
  } = tasklistPage.sessionSnapshot;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
      <TasklistSelectionFlow
        onEquipmentTypeChange={tasklistPage.setSelectedEquipmentType}
        onSubmitCycle={tasklistPage.submitCycleSelection}
        onSubmitEquipment={tasklistPage.submitEquipmentSelection}
        selectedEquipmentType={tasklistPage.selectedEquipmentType}
        step={tasklistPage.step}
      />

      {tasklistPage.step === "form" ? (
        <>
          <GeneratorTasklistHeaderSection
            location={tasklistPage.location}
            monthNumber={tasklistPage.monthNumber}
            reportDate={tasklistPage.reportDate}
            totalTasklistPlan={totalTasklistPlan}
            totalTasklistSelesai={totalTasklistSelesai}
            weekNumber={tasklistPage.weekNumber}
            year={tasklistPage.year}
          />

          <section className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
            <div>
              <p className="text-sm font-bold text-neutral-950">
                Generator - {cycleLabel[tasklistPage.cycle]}
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                Siklus dipilih di awal. Untuk mengganti siklus, ulangi pilihan
                tasklist.
              </p>
            </div>
            <button
              className="h-10 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              onClick={tasklistPage.restartSelection}
              type="button"
            >
              Ganti Pilihan
            </button>
          </section>

          <section className="rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm text-slate-700">
            <div className="flex gap-3">
              <IoInformationCircleOutline
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-xl text-sky-700"
              />
              <div>
                <p className="font-bold text-slate-950">
                  Snapshot plan session ini: {taskCount} task x {equipmentCount}{" "}
                  equipment = {totalTasklistPlan}.
                </p>
                <p className="mt-1 leading-6">
                  Total plan disimpan saat session dibuat. Kalau jumlah equipment
                  berubah di masa depan, total plan dan real session lama tidak
                  ikut berubah. Total selesai dihitung dari jumlah cell yang
                  sudah punya performance.
                </p>
              </div>
            </div>
          </section>

          <GeneratorTasklistEquipmentSection
            cycleLabel={cycleLabel[tasklistPage.cycle]}
            equipment={tasklistPage.equipment}
            executionDate={tasklistPage.executionDate}
            firstEmptyTaskId={tasklistPage.firstEmptyTaskId}
            getMeasuredValue={(taskId, equipmentId) =>
              tasklistPage.getResult(taskId, equipmentId)?.measuredValue ?? ""
            }
            getPerformance={(taskId, equipmentId) =>
              tasklistPage.getResult(taskId, equipmentId)?.performance ?? ""
            }
            onEquipmentChange={tasklistPage.setSelectedEquipmentId}
            onExecutionDateChange={tasklistPage.setExecutionDate}
            onMeasuredValueChange={tasklistPage.updateMeasuredValue}
            onPerformanceChange={tasklistPage.updatePerformance}
            onRemarksChange={tasklistPage.setRemarks}
            remarks={tasklistPage.remarks}
            selectedEquipment={tasklistPage.selectedEquipment}
            selectedEquipmentFinishedCount={
              tasklistPage.selectedEquipmentFinishedCount
            }
            tasks={tasklistPage.tasks}
          />

          <section className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-5 py-4 shadow-sm">
            <div>
              <p className="text-sm font-bold text-neutral-950">
                Validasi sebelum submit
              </p>
              {submitMessage ? (
                <p className="mt-2 text-sm font-semibold text-sky-700">
                  {submitMessage}
                </p>
              ) : null}
            </div>
            <button
              className="h-10 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
              onClick={() => {
                const validation = tasklistPage.validateBeforeSubmit();
                setSubmitMessage(validation.message);

                if (!validation.isValid && validation.taskId) {
                  scrollToTask(validation.taskId);
                }
              }}
              type="button"
            >
              Submit Tasklist
            </button>
          </section>
        </>
      ) : null}
    </div>
  );
}
