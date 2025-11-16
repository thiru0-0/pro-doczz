import React from 'react';

export default function StyleSelector({ currentStyle, onSelect }: any) {
  const styles = [
    { id: 'style-modern-sidebar', name: 'Modern Sidebar' },
    { id: 'style-professional-header', name: 'Professional Header' },
    { id: 'style-dynamic-columns', name: 'Dynamic Columns' },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {styles.map(s=> (
          <button key={s.id} onClick={()=> onSelect(s)} className={`p-3 border rounded ${currentStyle?.id === s.id ? 'border-blue-500 shadow' : 'border-gray-200'}`}>
            <div className="h-32 bg-gray-100 rounded mb-2" />
            <div className="font-semibold">{s.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
