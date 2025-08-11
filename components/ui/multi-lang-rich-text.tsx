'use client'

import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { RichTextEditor } from '@/components/ui/rich-text-editor'

// Language configuration
const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'fr', name: 'French', flag: '🇫🇷' }
] as const

interface MultiLangRichTextProps {
  label: string
  value: Record<string, string>
  onChange: (value: Record<string, string>) => void
  placeholder?: string
  required?: boolean
  height?: string
}

export function MultiLangRichText({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  required,
  height = '200px'
}: MultiLangRichTextProps) {
  const [activeTab, setActiveTab] = useState('en')

  const handleChange = (lang: string, newValue: string) => {
    onChange({ ...value, [lang]: newValue })
  }

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="border rounded-lg">
        <div className="flex border-b">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setActiveTab(lang.code)}
              className={`px-3 py-2 text-sm flex items-center gap-2 border-r last:border-r-0 ${
                activeTab === lang.code 
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
        <div className="p-3">
          <RichTextEditor
            value={value[activeTab] || ''}
            onChange={(newValue) => handleChange(activeTab, newValue)}
            placeholder={placeholder ? `${placeholder} (${LANGUAGES.find(l => l.code === activeTab)?.name})` : ''}
            height={height}
          />
        </div>
      </div>
    </div>
  )
}