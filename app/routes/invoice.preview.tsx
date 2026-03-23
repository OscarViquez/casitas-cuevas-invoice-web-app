import { useNavigate } from "react-router";

export function meta() {
  return [{ title: "Preview Invoice — Casitas Cuevas" }];
}

export default function InvoicePreview() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Screen-only action bar */}
      <div className="flex gap-3 mb-6 print:hidden">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900 text-sm hover:bg-slate-50 transition-colors"
        >
          ← Back to Edit
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900 text-sm hover:bg-slate-50 transition-colors"
        >
          Print
        </button>
        <button
          type="button"
          disabled
          className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-400 text-sm cursor-not-allowed"
          title="Coming soon"
        >
          Download PDF
        </button>
        <button
          type="button"
          className="h-10 px-6 font-semibold rounded-md bg-black text-white text-sm hover:bg-slate-800 transition-colors"
        >
          Save Invoice
        </button>
      </div>

      {/* Invoice preview — placeholder */}
      <div className="bg-white border border-slate-200 rounded-lg p-10 shadow-sm">
        <p className="text-slate-400 text-sm">Invoice preview will render here.</p>
      </div>
    </div>
  );
}
