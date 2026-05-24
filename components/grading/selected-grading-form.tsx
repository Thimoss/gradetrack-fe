"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { GeneratorAssessmentSection } from "@/components/grading-form/generator-assessment-section";
import { GeneratorConclusionSection } from "@/components/grading-form/generator-conclusion-section";
import { GeneratorDocumentationSection } from "@/components/grading-form/generator-documentation-section";
import { GeneratorEquipmentCategorySection } from "@/components/grading-form/generator-equipment-category-section";
import { GeneratorEquipmentDataSection } from "@/components/grading-form/generator-equipment-data-section";
import type { GeneratorEquipmentData } from "@/components/grading-form/generator-equipment-data";
import { GeneratorFieldGuideSection } from "@/components/grading-form/generator-field-guide-section";
import { GeneratorMajorConditionSection } from "@/components/grading-form/generator-major-condition-section";
import { GeneratorMeasurementSection } from "@/components/grading-form/generator-measurement-section";
import { MovAssessmentSection } from "@/components/grading-form/mov-assessment-section";
import { MovConclusionSection } from "@/components/grading-form/mov-conclusion-section";
import { MovEquipmentDataSection } from "@/components/grading-form/mov-equipment-data-section";
import type { MovEquipmentData } from "@/components/grading-form/mov-equipment-data";
import { MovFieldDataSection } from "@/components/grading-form/mov-field-data-section";
import { MovMajorConditionSection } from "@/components/grading-form/mov-major-condition-section";
import { MtrAssessmentSection } from "@/components/grading-form/mtr-assessment-section";
import { MtrConclusionSection } from "@/components/grading-form/mtr-conclusion-section";
import { MtrEquipmentDataSection } from "@/components/grading-form/mtr-equipment-data-section";
import type { MtrEquipmentData } from "@/components/grading-form/mtr-equipment-data";
import { MtrMajorConditionSection } from "@/components/grading-form/mtr-major-condition-section";
import { PipAssessmentSection } from "@/components/grading-form/pip-assessment-section";
import { PipConclusionSection } from "@/components/grading-form/pip-conclusion-section";
import { PipEquipmentDataSection } from "@/components/grading-form/pip-equipment-data-section";
import type { PipEquipmentData } from "@/components/grading-form/pip-equipment-data";
import { PipFieldDataSection } from "@/components/grading-form/pip-field-data-section";
import { PipMajorConditionSection } from "@/components/grading-form/pip-major-condition-section";
import { PmpAssessmentSection } from "@/components/grading-form/pmp-assessment-section";
import { PmpConclusionSection } from "@/components/grading-form/pmp-conclusion-section";
import { PmpEquipmentDataSection } from "@/components/grading-form/pmp-equipment-data-section";
import type { PmpEquipmentData } from "@/components/grading-form/pmp-equipment-data";
import { PmpFieldGuideSection } from "@/components/grading-form/pmp-field-guide-section";
import { PmpMajorConditionSection } from "@/components/grading-form/pmp-major-condition-section";
import { PmpMeasurementSection } from "@/components/grading-form/pmp-measurement-section";
import { SgrAssessmentSection } from "@/components/grading-form/sgr-assessment-section";
import { SgrConclusionSection } from "@/components/grading-form/sgr-conclusion-section";
import { SgrEquipmentDataSection } from "@/components/grading-form/sgr-equipment-data-section";
import type { SgrEquipmentData } from "@/components/grading-form/sgr-equipment-data";
import { SgrFieldDataSection } from "@/components/grading-form/sgr-field-data-section";
import { SgrMajorConditionSection } from "@/components/grading-form/sgr-major-condition-section";
import { TnkAssessmentSection } from "@/components/grading-form/tnk-assessment-section";
import { TnkConclusionSection } from "@/components/grading-form/tnk-conclusion-section";
import { TnkEquipmentDataSection } from "@/components/grading-form/tnk-equipment-data-section";
import type { TnkEquipmentData } from "@/components/grading-form/tnk-equipment-data";
import { TnkFieldDataSection } from "@/components/grading-form/tnk-field-data-section";
import { TnkMajorConditionSection } from "@/components/grading-form/tnk-major-condition-section";
import { TrfAssessmentSection } from "@/components/grading-form/trf-assessment-section";
import { TrfConclusionSection } from "@/components/grading-form/trf-conclusion-section";
import { TrfEquipmentDataSection } from "@/components/grading-form/trf-equipment-data-section";
import type { TrfEquipmentData } from "@/components/grading-form/trf-equipment-data";
import { TrfFieldDataSection } from "@/components/grading-form/trf-field-data-section";
import { TrfMajorConditionSection } from "@/components/grading-form/trf-major-condition-section";
import { UpsAssessmentSection } from "@/components/grading-form/ups-assessment-section";
import { UpsConclusionSection } from "@/components/grading-form/ups-conclusion-section";
import { UpsEquipmentDataSection } from "@/components/grading-form/ups-equipment-data-section";
import type { UpsEquipmentData } from "@/components/grading-form/ups-equipment-data";
import { UpsFieldDataSection } from "@/components/grading-form/ups-field-data-section";
import { UpsMajorConditionSection } from "@/components/grading-form/ups-major-condition-section";
import type {
  GradingEquipmentOption,
  GradingEquipmentType,
} from "@/hooks/use-grading-page";

type SelectedGradingFormProps = {
  assessmentDate: string;
  selectedEquipmentOption: GradingEquipmentOption;
  selectedEquipmentType: GradingEquipmentType;
  selectedTag: string;
  onSelectedTagChange: (value: string) => void;
  onRestartFlow: () => void;
};

type AssessmentSummary = {
  totalScore: number;
  improvementParameters: string[];
};

type AssessmentSummaryState = AssessmentSummary & {
  formKey: string;
};

const emptySummary: AssessmentSummary = {
  totalScore: 0,
  improvementParameters: [],
};

function buildGeneratorEquipment(tag: string): GeneratorEquipmentData {
  return {
    tagNumber: tag,
    serialNumber: "",
    manufacturer: "",
    model: "",
    voltage: "",
    voltageUnit: "Volt",
    insulationClass: "",
    capacity: "",
    capacityUnit: "KVA",
    power: "",
    powerUnit: "Hz",
    manufactureYear: "",
    location: "",
  };
}

function buildMovEquipment(tag: string): MovEquipmentData {
  return {
    tagNumber: tag,
    serialNumber: "",
    location: "",
    manufactureYear: "",
    valveBodyManufacturer: "",
    valveBodyModel: "",
    valveType: "",
    nps: "",
    rating: "",
    actuatorManufacturer: "",
    actuatorModel: "",
    actuatorType: "",
    failurePosition: "",
    fluid: "",
    flowCapacity: "",
    flowCapacityUnit: "m3/h",
  };
}

function buildMtrEquipment(tag: string): MtrEquipmentData {
  return {
    tagNumber: tag,
    serialNumber: "",
    location: "",
    manufactureYear: "",
    manufacturer: "",
    model: "",
    flowMeterType: "",
    fluid: "",
    flowCapacity: "",
    flowCapacityUnit: "m3/h",
  };
}

function buildPipEquipment(tag: string): PipEquipmentData {
  return {
    lineNo: tag,
    lineDescription: "",
    fluid: "",
    diameter: "",
    diameterUnit: "Inch",
    length: "",
    lengthUnit: "M",
    designPressure: "",
    designPressureUnit: "Psig",
    designTemperature: "",
    designTemperatureUnit: "C",
    manufactureYear: "",
    location: "",
  };
}

function buildPmpEquipment(tag: string): PmpEquipmentData {
  return {
    tagNumber: tag,
    serialNumber: "",
    manufacturer: "",
    model: "",
    fluid: "",
    pumpType: "",
    driverType: "",
    insulationClass: "",
    flowCapacity: "",
    flowCapacityUnit: "GPM",
    power: "",
    powerUnit: "KW",
    manufactureYear: "",
    location: "",
  };
}

function buildSgrEquipment(tag: string): SgrEquipmentData {
  return {
    tagNumber: tag,
    serialNumber: "",
    location: "",
    manufactureYear: 0,
    manufacturer: "",
    model: "",
    designStandard: "",
    ratedOperationalVoltage: 0,
    ratedOperationalVoltageUnit: "Volt",
    mainBusbarRatedCurrent: 0,
    mainBusbarRatedCurrentUnit: "Ampere",
    circuitBreakerType: "",
    springChargingMotorAuxSupplyVoltage: 0,
    springChargingMotorAuxSupplyVoltageUnit: "Volt",
    protectionCircuitAuxSupplyVoltage: 0,
    protectionCircuitAuxSupplyVoltageUnit: "Volt",
    controlSignallingAuxSupplyVoltage: 0,
    controlSignallingAuxSupplyVoltageUnit: "Volt",
    heatingLightingAuxSupplyVoltage: 0,
    heatingLightingAuxSupplyVoltageUnit: "Volt",
    frequency: 0,
    frequencyUnit: "Hz",
    ratedShortTimeWithstandCurrent: 0,
    ratedShortTimeWithstandCurrentUnit: "kA",
    ratedShortTimeWithstandDuration: 0,
    ratedShortTimeWithstandDurationUnit: "sec",
    degreeOfProtection: "",
    totalCubicle: 0,
  };
}

function buildTnkEquipment(tag: string): TnkEquipmentData {
  return {
    tagNumber: tag,
    serialNumber: "",
    manufacturer: "",
    fluid: "",
    roofType: "",
    foundationType: "",
    diameter: 0,
    diameterUnit: "M",
    height: 0,
    heightUnit: "M",
    capacity: 0,
    capacityUnit: "KL",
    manufactureYear: 0,
    location: "",
  };
}

function buildTrfEquipment(tag: string): TrfEquipmentData {
  return {
    tagNumber: tag,
    serialNumber: "",
    location: "",
    manufactureYear: 0,
    manufacturer: "",
    model: "",
    designStandard: "",
    numberOfPhase: 0,
    impedance: 0,
    impedanceUnit: "%",
    temperatureRiseOil: 0,
    temperatureRiseWinding: 0,
    temperatureRiseUnit: "C",
    frequency: 0,
    frequencyUnit: "Hz",
    ratedPower: 0,
    ratedPowerUnit: "kVA",
    primaryRatedVoltage: 0,
    secondaryRatedVoltage: 0,
    ratedVoltageUnit: "Volt",
    primaryRatedCurrent: 0,
    secondaryRatedCurrent: 0,
    ratedCurrentUnit: "Ampere",
    coolingType: "",
    vectorGroup: "",
    numberOfTap: 0,
    nominalTap: 0,
    oilWeight: 0,
    oilWeightUnit: "Kg",
    totalMass: 0,
    totalMassUnit: "Kg",
  };
}

function buildUpsEquipment(tag: string): UpsEquipmentData {
  return {
    tagNumber: tag,
    serialNumber: "",
    location: "",
    manufactureYear: "",
    manufacturer: "",
    model: "",
    designStandard: "",
    mainInputVoltage: "",
    mainInputVoltageUnit: "Volt",
    mainInputCurrent: "",
    mainInputCurrentUnit: "Ampere",
    mainInputFrequency: "",
    mainInputFrequencyUnit: "Hz",
    mainInputPowerKva: "",
    mainInputPowerKw: "",
    mainInputShortCircuitCurrent: "",
    bypassVoltage: "",
    bypassCurrent: "",
    bypassFrequency: "",
    bypassPowerKva: "",
    bypassPowerKw: "",
    bypassShortCircuitCurrent: "",
    batteryVoltage: "",
    batteryNominalCurrent: "",
    batteryMaxCurrent: "",
    outputVoltage: "",
    outputCurrent: "",
    outputFrequency: "",
    outputPowerKva: "",
    outputPowerKw: "",
    outputShortCircuitCurrent: "",
    ipRating: "",
  };
}

export function SelectedGradingForm({
  assessmentDate,
  selectedEquipmentOption,
  selectedEquipmentType,
  selectedTag,
  onSelectedTagChange,
  onRestartFlow,
}: SelectedGradingFormProps) {
  const router = useRouter();
  const formKey = `${selectedEquipmentType}-${selectedTag}`;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [summaryState, setSummaryState] = useState<AssessmentSummaryState>({
    formKey,
    ...emptySummary,
  });
  const summary =
    summaryState.formKey === formKey ? summaryState : emptySummary;

  const updateSummary = useCallback((nextSummary: AssessmentSummary) => {
    setSummaryState({ formKey, ...nextSummary });
  }, [formKey]);

  const updateTotalScore = useCallback((totalScore: number) => {
    setSummaryState({ formKey, totalScore, improvementParameters: [] });
  }, [formKey]);

  async function submitGrading() {
    setIsSubmitting(true);

    try {
      const createdBy =
        window.localStorage.getItem("grading_employee_number") ?? "admin-depot";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:3001"}/grading-submissions/${selectedEquipmentType}`,
        {
          body: JSON.stringify({
            tagNumber: selectedTag,
            equipmentType: selectedEquipmentType,
            inspectionDate: assessmentDate,
            equipmentData: { tagNumber: selectedTag },
            totalScore: summary.totalScore,
            createdBy,
          }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        },
      );
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Gagal submit grading.");
      }

      toast.success("Grading disubmit dan otomatis approved.");
      router.push("/submissions");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal submit grading.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-5" key={formKey}>
      <header className="rounded-lg border border-zinc-200 bg-white px-6 py-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-sky-700">
              Form Grading
            </p>
            <h1 className="mt-2 text-2xl font-bold text-neutral-950">
              {selectedEquipmentOption.label}
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              Tanggal penilaian {assessmentDate}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="block" htmlFor="equipment-tag-select">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500">
                Nomor Tag
              </span>
              <select
                className="h-11 min-w-48 rounded-lg border border-zinc-200 bg-white px-3 text-sm font-semibold text-neutral-950 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                id="equipment-tag-select"
                onChange={(event) => onSelectedTagChange(event.target.value)}
                value={selectedTag}
              >
                {selectedEquipmentOption.tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="mt-5 h-11 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              onClick={onRestartFlow}
              type="button"
            >
              Ganti Pilihan
            </button>
            <div className="mt-5 rounded-lg bg-slate-950 px-4 py-3 text-right text-white shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-300">
                Total Skor
              </p>
              <p className="text-2xl font-bold">
                {summary.totalScore.toFixed(1).replace(".", ",")}
              </p>
            </div>
            <button
              className="mt-5 h-11 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
              onClick={submitGrading}
              type="button"
            >
              {isSubmitting ? "Submit..." : "Submit Grading"}
            </button>
          </div>
        </div>
      </header>

      {selectedEquipmentType === "gst" ? (
        <>
          <GeneratorEquipmentDataSection
            equipment={buildGeneratorEquipment(selectedTag)}
          />
          <GeneratorDocumentationSection />
          <GeneratorFieldGuideSection />
          <GeneratorMeasurementSection />
          <GeneratorMajorConditionSection />
          <GeneratorAssessmentSection
            onTotalScoreChange={updateTotalScore}
          />
          <GeneratorEquipmentCategorySection totalScore={summary.totalScore} />
          <GeneratorConclusionSection totalScore={summary.totalScore} />
        </>
      ) : null}

      {selectedEquipmentType === "mov" ? (
        <>
          <MovEquipmentDataSection equipment={buildMovEquipment(selectedTag)} />
          <GeneratorDocumentationSection />
          <MovFieldDataSection />
          <MovMajorConditionSection />
          <MovAssessmentSection onSummaryChange={updateSummary} />
          <GeneratorEquipmentCategorySection totalScore={summary.totalScore} />
          <MovConclusionSection
            totalScore={summary.totalScore}
            improvementParameters={summary.improvementParameters}
          />
        </>
      ) : null}

      {selectedEquipmentType === "mtr" ? (
        <>
          <MtrEquipmentDataSection equipment={buildMtrEquipment(selectedTag)} />
          <GeneratorDocumentationSection />
          <MovFieldDataSection />
          <MtrMajorConditionSection />
          <MtrAssessmentSection onSummaryChange={updateSummary} />
          <GeneratorEquipmentCategorySection totalScore={summary.totalScore} />
          <MtrConclusionSection
            totalScore={summary.totalScore}
            improvementParameters={summary.improvementParameters}
          />
        </>
      ) : null}

      {selectedEquipmentType === "pip" ? (
        <>
          <PipEquipmentDataSection equipment={buildPipEquipment(selectedTag)} />
          <GeneratorDocumentationSection />
          <PipFieldDataSection />
          <PipMajorConditionSection />
          <PipAssessmentSection onSummaryChange={updateSummary} />
          <GeneratorEquipmentCategorySection totalScore={summary.totalScore} />
          <PipConclusionSection
            totalScore={summary.totalScore}
            improvementParameters={summary.improvementParameters}
          />
        </>
      ) : null}

      {selectedEquipmentType === "pmp" ? (
        <>
          <PmpEquipmentDataSection equipment={buildPmpEquipment(selectedTag)} />
          <GeneratorDocumentationSection />
          <PmpFieldGuideSection />
          <PmpMeasurementSection />
          <PmpMajorConditionSection />
          <PmpAssessmentSection onSummaryChange={updateSummary} />
          <GeneratorEquipmentCategorySection totalScore={summary.totalScore} />
          <PmpConclusionSection
            totalScore={summary.totalScore}
            improvementParameters={summary.improvementParameters}
          />
        </>
      ) : null}

      {selectedEquipmentType === "sgr" ? (
        <>
          <SgrEquipmentDataSection equipment={buildSgrEquipment(selectedTag)} />
          <GeneratorDocumentationSection />
          <SgrFieldDataSection />
          <SgrMajorConditionSection />
          <SgrAssessmentSection onSummaryChange={updateSummary} />
          <GeneratorEquipmentCategorySection totalScore={summary.totalScore} />
          <SgrConclusionSection
            totalScore={summary.totalScore}
            improvementParameters={summary.improvementParameters}
          />
        </>
      ) : null}

      {selectedEquipmentType === "tnk" ? (
        <>
          <TnkEquipmentDataSection equipment={buildTnkEquipment(selectedTag)} />
          <GeneratorDocumentationSection />
          <TnkFieldDataSection />
          <TnkMajorConditionSection />
          <TnkAssessmentSection onSummaryChange={updateSummary} />
          <GeneratorEquipmentCategorySection totalScore={summary.totalScore} />
          <TnkConclusionSection
            totalScore={summary.totalScore}
            improvementParameters={summary.improvementParameters}
          />
        </>
      ) : null}

      {selectedEquipmentType === "trf" ? (
        <>
          <TrfEquipmentDataSection equipment={buildTrfEquipment(selectedTag)} />
          <GeneratorDocumentationSection />
          <TrfFieldDataSection />
          <TrfMajorConditionSection />
          <TrfAssessmentSection onSummaryChange={updateSummary} />
          <GeneratorEquipmentCategorySection totalScore={summary.totalScore} />
          <TrfConclusionSection
            totalScore={summary.totalScore}
            improvementParameters={summary.improvementParameters}
          />
        </>
      ) : null}

      {selectedEquipmentType === "ups" ? (
        <>
          <UpsEquipmentDataSection equipment={buildUpsEquipment(selectedTag)} />
          <GeneratorDocumentationSection />
          <UpsFieldDataSection />
          <UpsMajorConditionSection />
          <UpsAssessmentSection onSummaryChange={updateSummary} />
          <GeneratorEquipmentCategorySection totalScore={summary.totalScore} />
          <UpsConclusionSection
            totalScore={summary.totalScore}
            improvementParameters={summary.improvementParameters}
          />
        </>
      ) : null}
    </div>
  );
}
