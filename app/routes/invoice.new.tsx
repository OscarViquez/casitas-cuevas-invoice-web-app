import { useNavigate } from "react-router";
import { InvoiceForm } from "~/components/InvoiceForm";
import { getNextInvoiceNumber, saveInvoice } from "~/lib/db";
import type { InvoiceFormValues } from "~/lib/types";
import type { Route } from "./+types/invoice.new";

export function meta() {
  return [{ title: "New Invoice — Casitas Cuevas" }];
}

export async function clientLoader() {
  const invoiceNumber = await getNextInvoiceNumber();
  return { invoiceNumber };
}

export default function NewInvoice({ loaderData }: Route.ComponentProps) {
  const { invoiceNumber } = loaderData;
  const navigate = useNavigate();

  async function handleSave(values: InvoiceFormValues) {
    const subtotal = values.items.reduce(
      (sum, item) => sum + item.qty * item.unitPrice,
      0
    );
    const taxAmount = subtotal * ((values.taxPercent || 0) / 100);

    await saveInvoice({
      ...values,
      invoiceNumber,
      subtotal,
      taxAmount,
      total: subtotal + taxAmount,
      createdAt: new Date().toISOString(),
    });

    navigate("/");
  }

  return (
    <div className="min-h-screen print:min-h-0 bg-slate-50 print:bg-white py-8 print:py-0 px-4 print:px-0">
      <div className="max-w-4xl mx-auto">
        <InvoiceForm invoiceNumber={invoiceNumber} onSave={handleSave} />
      </div>
    </div>
  );
}
