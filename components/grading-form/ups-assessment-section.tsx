"use client";

import { useEffect, useMemo, useState } from "react";
import { GradingFormSection } from "./grading-form-section";
import {
  calculateUpsParameterScore,
  formatUpsScore,
  upsAssessmentParameters,
} from "./ups-assessment-data";

type SelectedUpsAssessment = Record<string, number>;

type UpsAssessmentSectionProps = {
  onSummaryChange?: (summary: {
    totalScore: number;
    improvementParameters: string[];
  }) => void;
};

export function UpsAssessmentSection({
  onSummaryChange,
}: UpsAssessmentSectionProps) {
  const [selectedAssessment, setSelectedAssessment] =
    useState<SelectedUpsAssessment>({});

  const summary = useMemo(() => {
    return upsAssessmentParameters.reduce(
      (current, parameter) => {
        const selectedValue = selectedAssessment[parameter.code];
        const score = calculateUpsParameterScore(
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
          Total {formatUpsScore(summary.totalScore)}
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
              <th className="w-72 border border-zinc-200 px-3 py-3 text-center font-bold text-slate-700">
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
            </tr>
          </thead>
          <tbody>
            {upsAssessmentParameters.map((parameter) => {
              const selectedValue = selectedAssessment[parameter.code];
              const score = calculateUpsParameterScore(
                parameter.weight,
                selectedValue,
              );

              return parameter.options.map((option, optionIndex) => {
                const isSelected = selectedValue === option.value;
                const selectionId = `ups-${parameter.code}-${option.value}`;

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
                    <td className="border border-zinc-200 px-4 py-2 leading-6 whitespace-pre-line">
                      {option.description}
                    </td>
                    <td className="border border-zinc-200 px-3 py-2 text-center font-semibold">
                      {option.value}
                    </td>
                    {optionIndex === 0 ? (
                      <td
                        className="border border-zinc-200 px-3 text-center font-bold"
                        rowSpan={parameter.options.length}
                      >
                        {formatUpsScore(score)}
                      </td>
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
                {formatUpsScore(summary.totalScore)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </GradingFormSection>
  );
}
