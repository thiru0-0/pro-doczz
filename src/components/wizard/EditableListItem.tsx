import React from 'react';

export default function EditableListItem({ list = [], onChange, itemShape = [], aiEnabled=false }: any) {
  const addItem = () => {
    const newItem:any = { id: crypto.randomUUID() };
    itemShape.forEach((k:any)=> newItem[k] = '');
    onChange([...(list||[]), newItem]);
  };
  const update = (id:any, key:any, value:any) => onChange((list||[]).map((it:any)=> it.id === id ? { ...it, [key]: value } : it));
  const remove = (id:any) => onChange((list||[]).filter((it:any)=> it.id !== id));

  return (
    <div className="space-y-3">
      {(list||[]).map((item:any)=> (
        <div key={item.id} className="p-3 border rounded">
          {itemShape.map((k:any)=>(
            <div key={k} className="mb-2">
              <label className="block text-sm font-medium">{k}</label>
              <input value={item[k]||''} onChange={(e)=> update(item.id, k, e.target.value)} className="w-full border rounded p-2" />
            </div>
          ))}
          {aiEnabled && (
            <div className="mt-2">
              <label className="block text-sm font-medium">AI Notes</label>
              <textarea value={item.notes||''} onChange={(e)=> update(item.id, 'notes', e.target.value)} className="w-full border rounded p-2 h-20" />
              <button onClick={()=> console.log('AI generate for', item.id)} className="mt-2 px-3 py-2 bg-blue-600 text-white rounded">Generate</button>
            </div>
          )}
          <div className="mt-2 flex justify-end">
            <button onClick={()=> remove(item.id)} className="px-2 py-1 bg-red-500 text-white rounded">Remove</button>
          </div>
        </div>
      ))}
      <div>
        <button onClick={addItem} className="px-3 py-2 bg-green-600 text-white rounded">Add</button>
      </div>
    </div>
  );
}
