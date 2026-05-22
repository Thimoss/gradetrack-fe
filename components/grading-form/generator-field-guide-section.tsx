import Image from "next/image";

type GeneratorFieldGuideSectionProps = {
  sketchSrc?: string;
  orientationSrc?: string;
};

export function GeneratorFieldGuideSection({
  sketchSrc = "/guide/gst-sketch.png",
  orientationSrc = "/guide/gst-orientasi.png",
}: GeneratorFieldGuideSectionProps) {
  return (
    <section className="border-b border-neutral-300 bg-white">
      <h2 className="px-1 text-lg font-bold uppercase leading-8 text-neutral-950">
        Pengambilan Data Lapangan
      </h2>
      <div className="mx-9 mb-3 grid grid-cols-[minmax(0,1.55fr)_minmax(280px,1fr)] gap-8 border border-neutral-300 px-1 py-1 max-md:mx-4 max-md:grid-cols-1 max-md:gap-4">
        <figure>
          <figcaption className="text-lg font-bold uppercase leading-7 text-neutral-950">
            Sketsa
          </figcaption>
          <div className="flex min-h-64 items-center justify-center">
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
        <figure>
          <figcaption className="text-lg font-bold uppercase leading-7 text-neutral-950">
            Orientasi
          </figcaption>
          <div className="flex min-h-64 items-center justify-center">
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
    </section>
  );
}
