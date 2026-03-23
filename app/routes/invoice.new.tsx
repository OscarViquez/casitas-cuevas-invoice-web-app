import { useNavigate } from "react-router";
import { InvoiceForm } from "~/components/invoice/InvoiceForm";
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
    const total = values.items.reduce(
      (sum, item) => sum + item.qty * item.unitPrice,
      0
    );

    await saveInvoice({
      ...values,
      invoiceNumber,
      subtotal: total,
      total,
      createdAt: new Date().toISOString(),
    });

    navigate("/");
  }

  return <InvoiceForm invoiceNumber={invoiceNumber} onSave={handleSave} />;
}
