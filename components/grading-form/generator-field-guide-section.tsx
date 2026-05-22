import Image from "next/image";
import { GradingFormSection } from "./grading-form-section";

type GeneratorFieldGuideSectionProps = {
  sketchSrc?: string;
  orientationSrc?: string;
};

export function GeneratorFieldGuideSection({
  sketchSrc = "/guide/gst-sketch.png",
  orientationSrc = "/guide/gst-orientasi.png",
}: GeneratorFieldGuideSectionProps) {
  return (
    <GradingFormSection title="Pengambilan Data Lapangan">
      <div className="grid grid-cols-[minmax(0,1.55fr)_minmax(280px,1fr)] gap-5 max-md:grid-cols-1">
        <figure className="rounded-lg border border-zinc-200 bg-slate-50 p-4">
          <figcaption className="text-sm font-bold uppercase tracking-wide text-neutral-700">
            Sketsa
          </figcaption>
          <div className="mt-3 flex min-h-64 items-center justify-center">
            <Image
              src={sketchSrc}
              alt="Sketsa titik pengambilan data generator"
              width={640}
              height={324}
              className="h-auto w-full max-w-[640px]"
              priority
            />
          </div>
        </figure>
        <figure className="rounded-lg border border-zinc-200 bg-slate-50 p-4">
          <figcaption className="text-sm font-bold uppercase tracking-wide text-neutral-700">
            Orientasi
          </figcaption>
          <div className="mt-3 flex min-h-64 items-center justify-center">
            <Image
              src={orientationSrc}
              alt="Orientasi pengambilan data generator"
              width={352}
              height={292}
              className="h-auto w-full max-w-[352px]"
              priority
            />
          </div>
        </figure>
      </div>
    </GradingFormSection>
  );
}
