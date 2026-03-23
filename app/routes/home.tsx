import { Link } from "react-router";
import { getAllInvoices } from "~/lib/db";
import type { Route } from "./+types/home";

export function meta() {
  return [{ title: "Invoices — Casitas Cuevas" }];
}

export async function clientLoader() {
  const invoices = await getAllInvoices();
  return { invoices };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { invoices } = loaderData;

  return (
    <div>
      {/* Page header */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-slate-500">Saved Invoices</p>
        <Link to="/new" className="button-primary flex items-center">
          New Invoice
        </Link>
      </div>

      {/* Invoice list */}
      {invoices.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-400 font-medium">No invoices yet</p>
          <p className="text-sm text-slate-400 mt-1">
            Create your first invoice to get started.
          </p>
          <Link to="/new" className="button-primary inline-flex items-center mt-6">
            New Invoice
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100">
          {invoices.map((invoice) => (
            <Link
              key={invoice.id}
              to={`/invoice/${invoice.id}`}
              className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
            >
              <div>
                <p className="font-semibold text-slate-900">
                  #{invoice.invoiceNumber}
                </p>
                <p className="text-sm text-slate-500 mt-0.5">
                  {invoice.businessName}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(invoice.total)}
                </p>
                <p className="text-sm text-slate-500 mt-0.5">{invoice.date}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
