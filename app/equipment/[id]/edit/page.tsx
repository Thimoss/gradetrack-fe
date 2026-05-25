import { EquipmentFormPage } from "@/components/equipment/equipment-form-page";
import { MasterLayout } from "@/components/layout/master-layout";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <MasterLayout>
      <EquipmentFormPage equipmentId={id} />
    </MasterLayout>
  );
}
