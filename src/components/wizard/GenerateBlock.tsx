import React, { useState } from 'react';
import { generateLatexCode } from '@/utils/latexGenerator';

export default function GenerateBlock({ payload }: { payload: any }) {
  const [generated, setGenerated] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const code = generateLatexCode(payload);
      setGenerated(code || '');
    } catch (e:any) {
      setGenerated('// Error generating output: ' + (e?.message || String(e)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <button onClick={handleGenerate} disabled={loading} className="px-3 py-2 bg-blue-600 text-white rounded">{loading? 'Generating...' : 'Generate'}</button>
        <button onClick={() => { navigator.clipboard?.writeText(generated); }} className="px-3 py-2 bg-gray-200 text-black rounded">Copy</button>
      </div>
      {generated && (
        <textarea readOnly value={generated} className="mt-3 w-full h-64 border p-2 rounded font-mono" />
      )}
    </div>
  );
}
