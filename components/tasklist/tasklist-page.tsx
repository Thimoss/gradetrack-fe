"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { TasklistEquipmentSection } from "@/components/tasklist/tasklist-equipment-section";
import { TasklistHeaderSection } from "@/components/tasklist/tasklist-header-section";
import { TasklistSelectionFlow } from "@/components/tasklist/tasklist-selection-flow";
import { TemplateDownloadLink } from "@/components/template-download-link";
import {
  type TasklistCycle,
  type TasklistEquipmentType,
  useTasklistPage,
} from "@/hooks/use-tasklist-page";
import { apiBaseUrl } from "@/lib/api-client";

const cycleLabel: Record<TasklistCycle, string> = {
  DAILY: "Harian",
  WEEKLY: "Mingguan",
  MONTHLY: "Bulanan",
  SIX_MONTHLY: "6 Bulanan",
  YEARLY: "Tahunan",
};

const equipmentTypeLabel: Record<TasklistEquipmentType, string> = {
  GST: "Genset",
  MOV: "Motor Operated Valve",
  MTR: "Meter Arus",
  PIP: "Sistem Perpipaan",
  PMP: "Pompa Produk",
  SGR: "Switch Gear",
  TNK: "Tangki",
  TRF: "Transformer",
  UPS: "UPS",
};

export function TasklistPage() {
  const router = useRouter();
  const tasklistPage = useTasklistPage();
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function scrollToTask(taskId: string) {
    window.requestAnimationFrame(() => {
      document
        .getElementById(`tasklist-task-${taskId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
  const {
    equipmentCount,
    occurrenceCount,
    planPerOccurrence,
    taskCount,
    totalTasklistPlan,
    totalTasklistSelesai,
  } = tasklistPage.sessionSnapshot;

  async function submitTasklist() {
    const validation = tasklistPage.validateBeforeSubmit();
    setSubmitMessage(validation.message);

    if (!validation.isValid && validation.taskId) {
      toast.error(validation.message);
      scrollToTask(validation.taskId);
      return;
    }

    if (!validation.isValid) {
      toast.error(validation.message);
      return;
    }

    setIsSubmitting(true);

    try {
      const createdBy =
        window.localStorage.getItem("grading_employee_number") ?? "admin-depot";
      const response = await fetch(
        `${apiBaseUrl}/tasklists`,
        {
          body: JSON.stringify({
            session: {
              depotId: Number(tasklistPage.selectedDepotId),
              equipmentType: tasklistPage.selectedEquipmentType,
              cycle: tasklistPage.cycle,
              reportDate: tasklistPage.reportDate,
              executionDate: tasklistPage.executionDate,
              location: tasklistPage.location,
              year: tasklistPage.year,
              monthNumber: tasklistPage.monthNumber,
              weekNumber: tasklistPage.weekNumber,
              remarks: tasklistPage.remarks,
              occurrenceCount,
              createdBy,
            },
            equipmentIds: tasklistPage.equipment.map((item) => item.id),
            resultsByTask: tasklistPage.tasks.map((task) => ({
              taskCode: task.code,
              results: tasklistPage.equipment.map((equipment) => {
                const result = tasklistPage.getResult(task.id, equipment.id);

                return {
                  equipmentId: equipment.id,
                  performance: result?.performance,
                  measuredValue: result?.measuredValue,
                };
              }),
            })),
          }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        },
      );
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Gagal submit tasklist.");
      }

      toast.success("Tasklist berhasil dikirim.");
      router.push("/submissions");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal submit tasklist.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
      <TasklistSelectionFlow
        availableCycles={tasklistPage.availableCycles}
        depots={tasklistPage.depots}
        isLoadingDepots={tasklistPage.isLoadingDepots}
        isLoadingEquipment={tasklistPage.isLoadingEquipment}
        isLoadingTemplate={tasklistPage.isLoadingTemplate}
        onDepotChange={tasklistPage.setSelectedDepotId}
        onEquipmentTypeChange={tasklistPage.setSelectedEquipmentType}
        onSubmitDepot={tasklistPage.submitDepotSelection}
        onSubmitCycle={tasklistPage.submitCycleSelection}
        onSubmitEquipment={tasklistPage.submitEquipmentSelection}
        selectedDepotId={tasklistPage.selectedDepotId}
        selectedEquipmentType={tasklistPage.selectedEquipmentType}
        selectionError={tasklistPage.selectionError}
        step={tasklistPage.step}
      />

      {tasklistPage.step === "form" ? (
        <>
          <TasklistHeaderSection
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
              <p className="text-sm font-bold text-[#232122]">
                {equipmentTypeLabel[tasklistPage.selectedEquipmentType]} -{" "}
                {cycleLabel[tasklistPage.cycle]}
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                Siklus dipilih di awal. Untuk mengganti siklus, pilih ulang
                tasklist.
              </p>
            </div>
            <button
              className="h-10 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              onClick={tasklistPage.restartSelection}
              type="button"
            >
              Ganti pilihan
            </button>
            <TemplateDownloadLink
              equipmentType={tasklistPage.selectedEquipmentType}
              kind="tasklist"
            >
              Unduh PDF
            </TemplateDownloadLink>
          </section>

          <section className="rounded-lg border border-[#b8d9ef] bg-[#E6F1FA] p-4 text-sm text-slate-700">
            <div className="flex gap-3">
              <IoInformationCircleOutline
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-xl text-[#036CB6]"
              />
              <div>
                <p className="font-bold text-[#232122]">
                  Rekap bulan ini: {taskCount} task x {equipmentCount}{" "}
                  peralatan x {occurrenceCount} jadwal ={" "}
                  {totalTasklistPlan}.
                </p>
                <p className="mt-1 leading-6">
                  Rencana per jadwal {planPerOccurrence}. Harian memakai hari
                  efektif, mingguan memakai jumlah minggu, bulanan satu kali, 6
                  bulanan masuk bulan ke-6 dan ke-12, tahunan masuk bulan ke-12.
                  Realisasi mengikuti jadwal yang sudah selesai.
                </p>
              </div>
            </div>
          </section>

          <TasklistEquipmentSection
            cycleLabel={cycleLabel[tasklistPage.cycle]}
            equipmentType={tasklistPage.selectedEquipmentType}
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
              <p className="text-sm font-bold text-[#232122]">
                Periksa sebelum kirim
              </p>
              {submitMessage ? (
                <p className="mt-2 text-sm font-semibold text-[#036CB6]">
                  {submitMessage}
                </p>
              ) : null}
            </div>
            <button
              className="h-10 rounded-lg bg-[#036CB6] px-4 text-sm font-semibold text-white transition hover:bg-[#025894]"
              disabled={isSubmitting}
              onClick={submitTasklist}
              type="button"
            >
              {isSubmitting ? "Mengirim..." : "Kirim tasklist"}
            </button>
          </section>
        </>
      ) : null}
    </div>
  );
}
