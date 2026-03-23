export function meta() {
  return [{ title: "Settings — Casitas Cuevas" }];
}

export default function Settings() {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-6">Settings</h2>

      {/* Language */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <p className="text-sm font-semibold text-slate-900 mb-3">Language</p>
        <div className="flex gap-3">
          <button className="h-9 px-5 rounded-md bg-black text-white text-sm font-medium">
            English
          </button>
          <button className="h-9 px-5 rounded-md border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
            Español
          </button>
        </div>
      </div>
    </div>
  );
}
