export type PartCondition = "new" | "used" | "reconditioned" | "for_recovery";
export type PartStatus = "active" | "inactive" | "unavailable";
export type Part = {
  id: string; company_id: string; internal_code: string; custom_code: string | null;
  name: string; description: string | null; category_id: string | null; brand: string | null;
  manufacturer: string | null; oem_code: string | null; barcode: string | null;
  condition: PartCondition; status: PartStatus; quantity: number; min_quantity: number;
  reserved_quantity: number; unit: string; cost_unit: number; sale_price: number;
  location_text: string | null; supplier_id: string | null; notes: string | null;
  created_at: string; updated_at: string;
  part_photos?: PartPhoto[];
};
export type PartPhoto = { id: string; part_id: string; storage_path: string; original_name: string; is_primary: boolean; created_at: string; publicUrl?: string };
export type StockMovement = { id: string; part_id: string; movement_type: string; quantity: number; previous_quantity: number; new_quantity: number; reason: string | null; created_at: string };
export const conditionLabels: Record<PartCondition, string> = {
  new: "Nova", used: "Usada", reconditioned: "Recondicionada", for_recovery: "Para recuperação",
};
