'use client'

import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

// 动态导入ReactQuill以避免SSR问题
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  height?: string
}

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = '请输入内容...', 
  height = '200px' 
}: RichTextEditorProps) {
  // 配置工具栏
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  }), [])

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'size', 'color', 'background', 'align',
    'link'
  ]

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ height }}
      />
      <style jsx global>{`
        .rich-text-editor .ql-editor {
          min-height: ${height};
        }
        .rich-text-editor .ql-toolbar {
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
        }
        .rich-text-editor .ql-container {
          border-bottom: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
        }
      `}</style>
    </div>
  )
}