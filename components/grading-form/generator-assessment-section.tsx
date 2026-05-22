"use client";

import { useEffect, useMemo, useState } from "react";
import {
  calculateParameterScore,
  formatScore,
  generatorAssessmentParameters,
} from "./generator-assessment-data";

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
    <section className="border-b-4 border-blue-700 bg-white">
      <h2 className="px-1 text-lg font-bold uppercase leading-8 text-neutral-950">
        Penilaian Peralatan
      </h2>
      <table className="w-full border-collapse text-base text-neutral-950">
        <thead>
          <tr className="bg-blue-300">
            <th className="w-10 border border-neutral-300 px-2 py-4 text-center font-bold">
              No
            </th>
            <th className="w-52 border border-neutral-300 px-3 py-4 text-center font-bold">
              Parameter
            </th>
            <th
              className="border border-neutral-300 px-3 py-4 text-center font-bold"
              colSpan={2}
            >
              Kondisi
            </th>
            <th className="w-28 border border-neutral-300 px-3 py-4 text-center font-bold">
              Nilai (%)
            </th>
            <th className="w-36 border border-neutral-300 px-3 py-4 text-center font-bold">
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
                        className="border border-neutral-300 px-2 text-center"
                        rowSpan={parameter.options.length}
                      >
                        {parameter.displayNo}
                      </td>
                      <th
                        className="border border-neutral-300 px-2 text-center font-normal"
                        rowSpan={parameter.options.length}
                        scope="rowgroup"
                      >
                        {parameter.parameter}
                      </th>
                    </>
                  ) : null}
                  <td
                    className={`w-24 border border-neutral-300 p-0 ${isSelected ? "bg-neutral-300" : "bg-blue-100"}`}
                  >
                    <label
                      className="flex min-h-10 cursor-pointer items-center justify-center px-2"
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
                  <td className="whitespace-pre-line border border-neutral-300 px-1 py-1.5">
                    {option.description}
                  </td>
                  <td className="border border-neutral-300 px-3 py-1.5 text-center">
                    {option.value}
                  </td>
                  {optionIndex === 0 ? (
                    <td
                      className="border border-neutral-300 px-3 text-center"
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
              className="border border-neutral-300 px-3 py-1 text-right font-bold"
              colSpan={5}
            >
              Total
            </td>
            <td className="border border-neutral-300 px-3 py-1 text-center font-bold">
              {formatScore(totalScore)}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
