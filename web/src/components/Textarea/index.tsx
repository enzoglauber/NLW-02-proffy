import React from 'react'

import './styles.scss'

interface TextareaProps
extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label: string
}

export const Textarea: React.FC<TextareaProps> = (
  { label, name, ...rest } : TextareaProps
) => (
  <div className="textarea-block">
    <label htmlFor={name}>{label}</label>
    <textarea id={name} {...rest} />
  </div>
)
