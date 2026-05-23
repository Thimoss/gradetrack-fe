"use client";

import { useEffect, useMemo, useState } from "react";
import { GradingFormSection } from "./grading-form-section";
import {
  calculateSgrParameterScore,
  formatSgrScore,
  sgrAssessmentParameters,
} from "./sgr-assessment-data";

type SelectedSgrAssessment = Record<string, number>;

type SgrAssessmentSectionProps = {
  onSummaryChange?: (summary: {
    totalScore: number;
    improvementParameters: string[];
  }) => void;
};

export function SgrAssessmentSection({
  onSummaryChange,
}: SgrAssessmentSectionProps) {
  const [selectedAssessment, setSelectedAssessment] =
    useState<SelectedSgrAssessment>({});

  const summary = useMemo(() => {
    return sgrAssessmentParameters.reduce(
      (current, parameter) => {
        const selectedValue = selectedAssessment[parameter.code];
        const score = calculateSgrParameterScore(
          parameter.weight,
          selectedValue,
        );

        return {
          totalScore: current.totalScore + (score ?? 0),
          improvementParameters:
            selectedValue !== undefined && selectedValue <= 30
              ? [...current.improvementParameters, parameter.parameter]
              : current.improvementParameters,
        };
      },
      { totalScore: 0, improvementParameters: [] as string[] },
    );
  }, [selectedAssessment]);

  useEffect(() => {
    onSummaryChange?.(summary);
  }, [onSummaryChange, summary]);

  return (
    <GradingFormSection
      title="Penilaian Peralatan"
      headerSlot={
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
          Total {formatSgrScore(summary.totalScore)}
        </span>
      }
      bodyClassName="p-0"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1040px] border-collapse text-sm text-neutral-950">
          <thead>
            <tr className="bg-slate-100">
              <th className="w-10 border border-zinc-200 px-2 py-3 text-center font-bold text-slate-700">
                No
              </th>
              <th className="w-64 border border-zinc-200 px-3 py-3 text-center font-bold text-slate-700">
                Parameter
              </th>
              <th
                className="border border-zinc-200 px-3 py-3 text-center font-bold text-slate-700"
                colSpan={2}
              >
                Kondisi
              </th>
              <th className="w-28 border border-zinc-200 px-3 py-3 text-center font-bold text-slate-700">
                Nilai (%)
              </th>
              <th className="w-32 border border-zinc-200 px-3 py-3 text-center font-bold text-slate-700">
                Skor
              </th>
              <th className="w-24 border border-zinc-200 px-3 py-3 text-center font-bold text-slate-700">
                Bobot
              </th>
            </tr>
          </thead>
          <tbody>
            {sgrAssessmentParameters.map((parameter) => {
              const selectedValue = selectedAssessment[parameter.code];
              const score = calculateSgrParameterScore(
                parameter.weight,
                selectedValue,
              );

              return parameter.options.map((option, optionIndex) => {
                const isSelected = selectedValue === option.value;
                const selectionId = `sgr-${parameter.code}-${option.value}`;

                return (
                  <tr key={`${parameter.code}-${option.value}`}>
                    {optionIndex === 0 ? (
                      <>
                        <td
                          className="border border-zinc-200 px-2 text-center font-medium"
                          rowSpan={parameter.options.length}
                        >
                          {parameter.displayNo}
                        </td>
                        <th
                          className="border border-zinc-200 px-3 text-center font-semibold"
                          rowSpan={parameter.options.length}
                          scope="rowgroup"
                        >
                          {parameter.parameter}
                        </th>
                      </>
                    ) : null}
                    <td
                      className={`w-24 border border-zinc-200 p-0 transition ${
                        isSelected
                          ? "bg-slate-900 text-white hover:bg-slate-900"
                          : "bg-white text-slate-700 hover:bg-sky-50"
                      }`}
                    >
                      <label
                        className="flex h-full min-h-11 w-full cursor-pointer items-center justify-center px-2"
                        htmlFor={selectionId}
                      >
                        <input
                          checked={isSelected}
                          className="sr-only"
                          id={selectionId}
                          name={parameter.code}
                          onChange={() => {
                            setSelectedAssessment((current) => ({
                              ...current,
                              [parameter.code]: option.value,
                            }));
                          }}
                          type="radio"
                          value={option.value}
                        />
                        <span className="font-bold">
                          {isSelected ? "X" : ""}
                        </span>
                      </label>
                    </td>
                    <td className="border border-zinc-200 px-4 py-2 leading-6">
                      {option.description}
                    </td>
                    <td className="border border-zinc-200 px-3 py-2 text-center font-semibold">
                      {option.value}
                    </td>
                    {optionIndex === 0 ? (
                      <>
                        <td
                          className="border border-zinc-200 px-3 text-center font-bold"
                          rowSpan={parameter.options.length}
                        >
                          {formatSgrScore(score)}
                        </td>
                        <td
                          className="border border-zinc-200 px-3 text-center font-semibold"
                          rowSpan={parameter.options.length}
                        >
                          {parameter.weight}
                        </td>
                      </>
                    ) : null}
                  </tr>
                );
              });
            })}
            <tr>
              <td
                className="border border-zinc-200 bg-slate-50 px-3 py-3 text-right font-bold"
                colSpan={5}
              >
                Total
              </td>
              <td className="border border-zinc-200 bg-slate-50 px-3 py-3 text-center font-bold">
                {formatSgrScore(summary.totalScore)}
              </td>
              <td className="border border-zinc-200 bg-slate-50 px-3 py-3 text-center font-bold">
                100
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </GradingFormSection>
  );
}
