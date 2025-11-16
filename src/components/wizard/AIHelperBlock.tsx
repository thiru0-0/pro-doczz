import React from 'react';

export default function AIHelperBlock({ title, notes, onNotesChange, onGenerate, isLoading, summary, onSummaryChange, placeholder }: any) {
  return (
    <div className="mb-4">
      <label className="block font-medium">{title}</label>
      <textarea value={notes} onChange={(e)=> onNotesChange(e.target.value)} placeholder={placeholder} className="w-full border p-2 rounded h-24" />
      <div className="mt-2 flex gap-2">
        <button onClick={onGenerate} className="px-3 py-2 bg-blue-600 text-white rounded" disabled={isLoading}>Generate</button>
        {isLoading && <div className="text-sm">Loading...</div>}
      </div>
      <label className="block font-medium mt-2">Generated</label>
      <textarea value={summary} onChange={(e)=> onSummaryChange(e.target.value)} className="w-full border p-2 rounded h-32 font-mono" />
    </div>
  );
}
