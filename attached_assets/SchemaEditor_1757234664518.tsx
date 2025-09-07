import React, { useState, useCallback } from 'react';
import type { Schema, ComponentKey } from '../types';
import { ChevronDownIcon } from './icons';
import { ColorPicker } from './ColorPicker';
import { ComponentContentEditor } from './ComponentContentEditor';
import { componentTemplates, allComponentKeys } from '../data/component-templates';
import { googleFonts } from '../data/fonts';
import { getFontFamilyName } from '../hooks/useThemeManager';

interface SchemaEditorProps {
  schema: Schema;
  onSchemaChange: (newSchema: Schema) => void;
}

const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-gray-200">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-3 px-4 text-left font-semibold text-text-base hover:bg-background">
                <span>{title}</span>
                <ChevronDownIcon className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} size={20} />
            </button>
            {isOpen && <div className="p-4 bg-background/50">{children}</div>}
        </div>
    );
};

const toPascalCase = (str: string) => str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());

export const SchemaEditor: React.FC<SchemaEditorProps> = ({ schema, onSchemaChange }) => {
    
  const handleSchemaUpdate = useCallback((path: string, value: any) => {
    const keys = path.split('.');
    const newSchema = JSON.parse(JSON.stringify(schema));
    let current: any = newSchema;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    onSchemaChange(newSchema);
  }, [schema, onSchemaChange]);
  
  const handleFontChange = (type: 'heading' | 'body', fontName: string) => {
    // Fonts with spaces in their names need quotes in CSS.
    const formattedFont = fontName.includes(' ') ? `'${fontName}'` : fontName;
    const newFontFamily = `${formattedFont}, sans-serif`;
    handleSchemaUpdate(`globalTheme.fonts.${type}`, newFontFamily);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(schema, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "schema.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const activeComponents = Object.keys(schema.components) as Array<keyof Schema['components']>;
  const availableComponents = allComponentKeys.filter(key => !activeComponents.includes(key));
  
  const addComponent = (key: ComponentKey) => {
    if (!key || !componentTemplates[key]) return;
    const newSchema = { ...schema, components: { ...schema.components, [key]: componentTemplates[key] } };
    onSchemaChange(newSchema);
  };

  const removeComponent = (key: ComponentKey) => {
    const { [key]: _, ...rest } = schema.components;
    // FIX: Cast `rest` to the correct type. The UI logic prevents removing required components, making this safe.
    onSchemaChange({ ...schema, components: rest as Schema['components'] });
  };
  
  const moveComponent = (key: ComponentKey, direction: 'up' | 'down') => {
    const keys = Object.keys(schema.components);
    // FIX: Convert key to string for indexOf, as ComponentKey can be `string | number`.
    const index = keys.indexOf(key.toString());
    if ((direction === 'up' && index <= 0) || (direction === 'down' && index >= keys.length - 1)) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    // 'navigation' must always be first, 'footer' must be last
    if (keys[newIndex] === 'navigation' || (direction === 'down' && keys[index] === 'footer')) return;
    if (direction === 'up' && keys[newIndex] === 'footer' && keys.length > newIndex +1) return;


    const newKeys = [...keys];
    [newKeys[index], newKeys[newIndex]] = [newKeys[newIndex], newKeys[index]]; // Swap
    
    const newComponents: Schema['components'] = newKeys.reduce((obj, key) => {
      obj[key as keyof Schema['components']] = schema.components[key as keyof Schema['components']];
      return obj;
    }, {} as Schema['components']);
    
    onSchemaChange({ ...schema, components: newComponents });
  };

  return (
    <div className="w-full bg-surface z-[100] h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-text-base">InstaSite Editor</h2>
          <p className="text-sm text-text-muted">Edit your site in real-time.</p>
        </div>
        <button onClick={handleExport} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">Export schema.json</button>
      </div>
      <div className="flex-grow overflow-y-auto">
        <CollapsibleSection title="Global Theme" defaultOpen>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(schema.globalTheme.colors).map(key => (
                    <ColorPicker 
                        key={key} 
                        label={toPascalCase(key)}
                        rgbString={schema.globalTheme.colors[key as keyof typeof schema.globalTheme.colors]} 
                        onChange={(value) => handleSchemaUpdate(`globalTheme.colors.${key}`, value)}
                    />
                ))}
              </div>
               <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">Heading Font</label>
                    <select
                        value={getFontFamilyName(schema.globalTheme.fonts.heading) || ''}
                        onChange={(e) => handleFontChange('heading', e.target.value)}
                        className="w-full bg-background border border-gray-300 rounded-md px-2 py-1.5 text-sm"
                    >
                        {googleFonts.map(font => <option key={font} value={font}>{font}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">Body Font</label>
                    <select
                        value={getFontFamilyName(schema.globalTheme.fonts.body) || ''}
                        onChange={(e) => handleFontChange('body', e.target.value)}
                        className="w-full bg-background border border-gray-300 rounded-md px-2 py-1.5 text-sm"
                    >
                        {googleFonts.map(font => <option key={font} value={font}>{font}</option>)}
                    </select>
                </div>
              </div>
            </div>
        </CollapsibleSection>

        <CollapsibleSection title="Component Management">
            <div className="space-y-2">
              {activeComponents.filter(key => key !== 'navigation' && key !== 'footer').map((key) => (
                <div key={key} className="flex items-center justify-between p-2 bg-background rounded-md">
                   {/* FIX: Convert key to string for toPascalCase, as it can be `string | number`. */}
                   <span className="font-medium text-sm">{toPascalCase(key.toString())}</span>
                   <div className="flex items-center gap-1">
                      <button onClick={() => moveComponent(key, 'up')} className="p-1 hover:bg-gray-200 rounded-md">↑</button>
                      <button onClick={() => moveComponent(key, 'down')} className="p-1 hover:bg-gray-200 rounded-md">↓</button>
                      {/* FIX: Prevent removal of the required 'hero' component. */}
                      {key !== 'hero' && <button onClick={() => removeComponent(key as ComponentKey)} className="p-1 text-red-500 hover:bg-red-100 rounded-md">✕</button>}
                   </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <select onChange={(e) => addComponent(e.target.value as ComponentKey)} className="w-full bg-background border border-gray-300 rounded-md px-2 py-1.5 text-sm">
                <option value="">Add a component...</option>
                {/* FIX: Convert key to string for toPascalCase, as ComponentKey can be `string | number`. */}
                {availableComponents.map(key => <option key={key} value={key}>{toPascalCase(key.toString())}</option>)}
              </select>
            </div>
        </CollapsibleSection>

        {activeComponents.map((componentName) => (
             // FIX: Convert componentName to string for toPascalCase, as it can be `string | number`.
             <CollapsibleSection key={componentName} title={`${toPascalCase(componentName.toString())} Content`}>
                 <ComponentContentEditor
                    data={schema.components[componentName].content}
                    path={`components.${componentName}.content`}
                    onUpdate={handleSchemaUpdate}
                />
             </CollapsibleSection>
        ))}
      </div>
    </div>
  );
};