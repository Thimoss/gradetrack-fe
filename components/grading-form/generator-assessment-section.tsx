"use client";

import { useEffect, useMemo, useState } from "react";
import {
  calculateParameterScore,
  formatScore,
  generatorAssessmentParameters,
} from "./generator-assessment-data";
import { GradingFormSection } from "./grading-form-section";

type SelectedAssessment = Record<string, number>;

type GeneratorAssessmentSectionProps = {
  onTotalScoreChange?: (totalScore: number) => void;
};

export function GeneratorAssessmentSection({
  onTotalScoreChange,
}: GeneratorAssessmentSectionProps) {
  const [selectedAssessment, setSelectedAssessment] =
    useState<SelectedAssessment>({});

  const totalScore = useMemo(() => {
    return generatorAssessmentParameters.reduce((total, parameter) => {
      const score = calculateParameterScore(
        parameter.weight,
        selectedAssessment[parameter.code],
      );

      return total + (score ?? 0);
    }, 0);
  }, [selectedAssessment]);

  useEffect(() => {
    onTotalScoreChange?.(totalScore);
  }, [onTotalScoreChange, totalScore]);

  return (
    <GradingFormSection
      title="Penilaian Peralatan"
      headerSlot={
        <span className="rounded-full bg-[#036CB6] px-3 py-1 text-xs font-bold text-white">
          Total {formatScore(totalScore)}
        </span>
      }
      bodyClassName="p-0"
    >
      <div className="overflow-x-auto">
      <table className="w-full min-w-[980px] border-collapse text-sm text-[#232122]">
        <thead>
          <tr className="bg-slate-100">
            <th className="w-10 border border-zinc-200 px-2 py-3 text-center font-bold text-slate-700">
              No
            </th>
            <th className="w-52 border border-zinc-200 px-3 py-3 text-center font-bold text-slate-700">
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
            <th className="w-36 border border-zinc-200 px-3 py-3 text-center font-bold text-slate-700">
              Skor
            </th>
          </tr>
        </thead>
        <tbody>
          {generatorAssessmentParameters.map((parameter) => {
            const selectedValue = selectedAssessment[parameter.code];
            const score = calculateParameterScore(parameter.weight, selectedValue);

            return parameter.options.map((option, optionIndex) => {
              const isSelected = selectedValue === option.value;
              const selectionId = `${parameter.code}-${option.value}`;

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
                        ? "bg-[#036CB6] text-white hover:bg-[#036CB6]"
                        : "bg-slate-50 text-slate-700 hover:bg-[#E6F1FA]"
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
                      <span className="font-bold">{isSelected ? "X" : ""}</span>
                    </label>
                  </td>
                  <td className="whitespace-pre-line border border-zinc-200 px-4 py-2 leading-6">
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
                      {formatScore(score)}
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
              {formatScore(totalScore)}
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </GradingFormSection>
  );
}
