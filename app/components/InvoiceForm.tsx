import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { BUSINESS, ITEM_PRESETS } from "~/lib/constants";
import type { InvoiceFormValues } from "~/lib/types";

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function formatDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${m}/${d}/${y}`;
}

function currency(val: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(val);
}

// Shared input styles
const inputBase =
  "block w-full border border-slate-600 rounded-md bg-white px-3 py-1.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-slate-600 print:border-0 print:ring-0 print:px-0 print:py-0 print:bg-transparent";

const inputInline =
  "border border-slate-600 rounded-md bg-white px-2 py-1 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-slate-600 print:border-0 print:ring-0 print:px-0 print:py-0 print:bg-transparent";

interface Props {
  invoiceNumber: string;
  onSave: (values: InvoiceFormValues) => Promise<void>;
}

export function InvoiceForm({ invoiceNumber, onSave }: Props) {
  const { register, control, handleSubmit } = useForm<InvoiceFormValues>({
    defaultValues: {
      businessName: "",
      addressLine1: "",
      addressLine2: "",
      date: todayISO(),
      terms: "Due upon receipt",
      items: [{ product: "", qty: 1, unitPrice: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const items = useWatch({ control, name: "items" });
  const dateValue = useWatch({ control, name: "date" });

  const total = items.reduce((sum, item) => {
    return sum + (Number(item.qty) || 0) * (Number(item.unitPrice) || 0);
  }, 0);

  return (
    <div>
      {/* Screen-only toolbar */}
      <div className="print:hidden mb-6 space-y-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Quick Add
          </p>
          <div className="flex flex-wrap gap-2">
            {ITEM_PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() =>
                  append({
                    product: preset.name,
                    qty: 1,
                    unitPrice: preset.price,
                  })
                }
                className="h-9 px-4 text-sm font-medium rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                {preset.name}{" "}
                <span className="text-slate-400">{currency(preset.price)}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSubmit(onSave)}
            className="h-10 px-6 font-semibold rounded-md bg-black text-white text-sm hover:bg-slate-800 transition-colors"
          >
            Save Invoice
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900 text-sm hover:bg-slate-50 transition-colors"
          >
            Print
          </button>
        </div>
      </div>

      {/* Invoice paper — always white regardless of dark mode */}
      <div className="bg-white dark:bg-white border border-slate-200 rounded-lg p-10 shadow-sm print:shadow-none print:border-0 print:p-0 print:rounded-none">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-widest">
            INVOICE
          </h1>
          <div className="text-right text-sm text-slate-600 space-y-0.5">
            <p className="font-semibold text-slate-900 text-base">
              {BUSINESS.name}
            </p>
            <p>{BUSINESS.address}</p>
            <p>{BUSINESS.phone}</p>
          </div>
        </div>

        {/* Bill To + Invoice Meta */}
        <div className="border-t border-slate-200 pt-6 mb-8">
          <div className="flex justify-between gap-12">
            {/* Bill To */}
            <div className="flex-1 space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Bill To
              </p>
              <input
                {...register("businessName")}
                placeholder="Business Name"
                className={inputBase}
              />
              <input
                {...register("addressLine1")}
                placeholder="Address Line 1"
                className={inputBase}
              />
              <input
                {...register("addressLine2")}
                placeholder="Address Line 2"
                className={inputBase}
              />
            </div>

            {/* Invoice Meta */}
            <div className="text-sm space-y-3 min-w-52">
              <div className="flex justify-between items-center gap-6"></div>
              <div className="flex justify-between items-center gap-6">
                <span className="text-slate-500">Date</span>
                <div>
                  <input
                    {...register("date")}
                    type="date"
                    className={`${inputInline} print:hidden`}
                  />
                  <span className="hidden print:block font-medium text-slate-900">
                    {formatDate(dateValue)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center gap-6">
                <span className="text-slate-500 whitespace-nowrap">Terms</span>
                <input
                  {...register("terms")}
                  className={`${inputInline} text-right w-40`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="border-t border-slate-200 pt-6 mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <th className="pb-3 pr-4">Product</th>
                <th className="pb-3 w-24 text-center">Qty</th>
                <th className="pb-3 w-32 text-right">Unit Price</th>
                <th className="pb-3 w-28 text-right">Total</th>
                <th className="pb-3 w-8 print:hidden" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fields.map((field, index) => {
                const qty = Number(items[index]?.qty) || 0;
                const unitPrice = Number(items[index]?.unitPrice) || 0;
                const lineTotal = qty * unitPrice;

                return (
                  <tr key={field.id}>
                    <td className="py-2 pr-4">
                      <input
                        {...register(`items.${index}.product`)}
                        placeholder="Product name"
                        className={inputBase}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        {...register(`items.${index}.qty`, {
                          valueAsNumber: true,
                        })}
                        type="number"
                        min="0.01"
                        step="0.01"
                        className={`${inputInline} w-full text-center`}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-slate-500 print:hidden">
                          $
                        </span>
                        <input
                          {...register(`items.${index}.unitPrice`, {
                            valueAsNumber: true,
                          })}
                          type="number"
                          min="0"
                          step="0.01"
                          className={`${inputInline} w-full text-right print:hidden`}
                        />
                        <span className="hidden print:block text-right font-medium text-slate-900">
                          {currency(unitPrice)}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 pl-2 text-right font-medium text-slate-900 whitespace-nowrap">
                      {currency(lineTotal)}
                    </td>
                    <td className="py-2 pl-2 print:hidden">
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-slate-300 hover:text-slate-600 transition-colors"
                          aria-label="Remove item"
                        >
                          ✕
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            type="button"
            onClick={() => append({ product: "", qty: 1, unitPrice: 0 })}
            className="mt-3 text-sm text-slate-400 hover:text-slate-900 font-medium transition-colors print:hidden"
          >
            + Add Item
          </button>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-10">
          <div className="w-64 text-sm">
            <div className="flex justify-between border-t border-slate-200 pt-3">
              <span className="font-semibold text-slate-900">Total</span>
              <span className="font-semibold text-slate-900">
                {currency(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 pt-6">
          <p className="text-sm text-slate-500 text-center">
            If you have any questions about this invoice, please contact{" "}
            {BUSINESS.phone}
          </p>
        </div>
      </div>
    </div>
  );
}
