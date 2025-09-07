import React from 'react';

interface EditorFieldProps {
  label: string;
  path: string;
  value: string;
  onUpdate: (path: string, value: string) => void;
}

const EditorField: React.FC<EditorFieldProps> = ({ label, path, value, onUpdate }) => {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-text-muted mb-1 capitalize">{label.replace(/([A-Z])/g, ' $1')}</label>
      <textarea
        value={value}
        onChange={(e) => onUpdate(path, e.target.value)}
        className="w-full bg-background border border-gray-300 rounded-md px-2 py-1.5 text-sm text-text-base focus:ring-2 focus:ring-primary focus:border-primary outline-none"
        rows={value && value.length > 50 ? 3 : 1}
      />
    </div>
  );
};

interface ComponentContentEditorProps {
  data: any;
  path: string;
  onUpdate: (path: string, value: any) => void;
}

export const ComponentContentEditor: React.FC<ComponentContentEditorProps> = ({ data, path, onUpdate }) => {
  if (!data) return null;

  return (
    <div>
      {Object.keys(data).map(key => {
        const value = data[key];
        const currentPath = `${path}.${key}`;

        if (typeof value === 'string') {
          return <EditorField key={currentPath} label={key} path={currentPath} value={value} onUpdate={onUpdate} />;
        }

        if (Array.isArray(value)) {
           // Case 1: 2D Array (Grid/Table) - e.g., (string | number | boolean)[][]
           if (value.length > 0 && Array.isArray(value[0])) {
                const handleUpdateCell = (rowIndex: number, cellIndex: number, newValue: string | number | boolean) => {
                    const newGrid = JSON.parse(JSON.stringify(value));
                    newGrid[rowIndex][cellIndex] = newValue;
                    onUpdate(currentPath, newGrid);
                };
                const handleRemoveRow = (rowIndex: number) => {
                    onUpdate(currentPath, value.filter((_, i) => i !== rowIndex));
                };
                const handleAddRow = () => {
                    const numCols = value[0]?.length || 1; // Default to 1 column if grid is empty
                    const newRow = new Array(numCols).fill(''); // Create a new row with default empty strings
                    onUpdate(currentPath, [...value, newRow]);
                };
                return (
                    <div key={currentPath} className="mb-4 p-3 border rounded-md bg-background/50">
                        <h4 className="font-semibold text-sm mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                        <div className="space-y-2">
                        {(value as (string | number | boolean)[][]).map((row, rowIndex) => (
                            <div key={rowIndex} className="flex items-start gap-2">
                                <div className="grid gap-2 flex-grow" style={{ gridTemplateColumns: `repeat(${row.length || 1}, minmax(0, 1fr))` }}>
                                    {row.map((cell, cellIndex) => {
                                        const cellPath = `${currentPath}.${rowIndex}.${cellIndex}`;
                                        if (typeof cell === 'boolean') {
                                            return <input key={cellPath} type="checkbox" checked={cell} onChange={(e) => handleUpdateCell(rowIndex, cellIndex, e.target.checked)} className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary place-self-center" />
                                        }
                                        if (typeof cell === 'number') {
                                            return <input key={cellPath} type="number" value={cell} onChange={(e) => handleUpdateCell(rowIndex, cellIndex, parseFloat(e.target.value) || 0)} className="w-full bg-background border border-gray-300 rounded-md px-2 py-1 text-sm" />
                                        }
                                        return ( // Default to string / textarea
                                            <textarea
                                                key={cellPath}
                                                value={String(cell)} // Ensure value is a string for textarea
                                                onChange={(e) => handleUpdateCell(rowIndex, cellIndex, e.target.value)}
                                                className="w-full bg-background border border-gray-300 rounded-md px-2 py-1 text-sm"
                                                rows={1}
                                            />
                                        );
                                    })}
                                </div>
                                <button onClick={() => handleRemoveRow(rowIndex)} className="p-1 text-red-500 hover:bg-red-100 rounded-md flex-shrink-0">✕</button>
                            </div>
                        ))}
                        </div>
                        <button onClick={handleAddRow} className="mt-3 text-sm text-primary font-semibold hover:underline">+ Add Row</button>
                    </div>
                );
            }
            // Case 2: Array of Objects (Recursive)
            else if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
              return (
                <div key={currentPath} className="mb-4 p-3 border rounded-md bg-background/50">
                  <h4 className="font-semibold text-sm mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                  {value.map((item, index) => (
                    <div key={`${currentPath}.${index}`} className="p-3 border-t first:border-t-0 mt-2 first:mt-0">
                       <ComponentContentEditor data={item} path={`${currentPath}.${index}`} onUpdate={onUpdate} />
                    </div>
                  ))}
                </div>
              );
            }
             // Case 3: Array of Primitives (string, boolean, number) or an empty array
            else {
                 const handleUpdatePrimitive = (index: number, newValue: string | boolean | number) => {
                    const newArray = [...value];
                    newArray[index] = newValue;
                    onUpdate(currentPath, newArray);
                };
                const handleRemovePrimitive = (index: number) => {
                    onUpdate(currentPath, value.filter((_, i) => i !== index));
                };
                const handleAddPrimitive = () => {
                    onUpdate(currentPath, [...value, '']); // Add empty string by default
                };
                return (
                    <div key={currentPath} className="mb-4 p-3 border rounded-md bg-background/50">
                        <h4 className="font-semibold text-sm mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                        <div className="space-y-2">
                        {(value as (string | boolean | number)[]).map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                {typeof item === 'boolean' && (
                                    <input type="checkbox" checked={item} onChange={(e) => handleUpdatePrimitive(index, e.target.checked)} className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary" />
                                )}
                                {typeof item === 'string' && (
                                    <textarea value={item} onChange={(e) => handleUpdatePrimitive(index, e.target.value)} className="flex-grow bg-background border border-gray-300 rounded-md px-2 py-1 text-sm" rows={1} />
                                )}
                                {typeof item === 'number' && (
                                    <input type="number" value={item} onChange={(e) => handleUpdatePrimitive(index, parseFloat(e.target.value) || 0)} className="flex-grow bg-background border border-gray-300 rounded-md px-2 py-1 text-sm" />
                                )}
                                <button onClick={() => handleRemovePrimitive(index)} className="p-1 text-red-500 hover:bg-red-100 rounded-md flex-shrink-0">✕</button>
                            </div>
                        ))}
                        </div>
                        <button onClick={handleAddPrimitive} className="mt-3 text-sm text-primary font-semibold hover:underline">+ Add Item</button>
                    </div>
                );
            }
        }

        if (typeof value === 'object' && value !== null) {
          return (
             <div key={currentPath} className="mb-4 p-3 border rounded-md">
                <h4 className="font-semibold text-sm mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                <ComponentContentEditor data={value} path={currentPath} onUpdate={onUpdate} />
             </div>
          );
        }
        
        return null;
      })}
    </div>
  );
};