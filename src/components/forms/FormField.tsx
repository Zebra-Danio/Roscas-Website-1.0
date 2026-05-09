import React from 'react'
import { cn } from '@/lib/utils'

type BaseProps = {
    id: string
    label: string
    required?: boolean
    helpText?: React.ReactNode
    error?: string
}

const baseInputClasses =
    'w-full rounded-md border bg-background px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60'

const labelClasses = 'block text-sm font-medium mb-1.5'
const helpClasses = 'mt-1 text-xs text-muted-foreground'
const errorClasses = 'mt-1 text-xs text-red-600'

export function TextField({
    id,
    label,
    required,
    helpText,
    error,
    type = 'text',
    ...rest
}: BaseProps & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div>
            <label htmlFor={id} className={labelClasses}>
                {label} {required && <span aria-hidden className="text-red-600">*</span>}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                required={required}
                aria-required={required}
                aria-invalid={!!error}
                className={cn(baseInputClasses)}
                {...rest}
            />
            {helpText && !error && <p className={helpClasses}>{helpText}</p>}
            {error && <p className={errorClasses}>{error}</p>}
        </div>
    )
}

export function TextareaField({
    id,
    label,
    required,
    helpText,
    error,
    rows = 5,
    ...rest
}: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <div>
            <label htmlFor={id} className={labelClasses}>
                {label} {required && <span aria-hidden className="text-red-600">*</span>}
            </label>
            <textarea
                id={id}
                name={id}
                required={required}
                rows={rows}
                aria-required={required}
                aria-invalid={!!error}
                className={cn(baseInputClasses, 'resize-y min-h-[120px]')}
                {...rest}
            />
            {helpText && !error && <p className={helpClasses}>{helpText}</p>}
            {error && <p className={errorClasses}>{error}</p>}
        </div>
    )
}

type SelectFieldProps = BaseProps &
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> & {
        options: { value: string; label: string }[]
        placeholder?: string
    }

export function SelectField({
    id,
    label,
    required,
    helpText,
    error,
    options,
    placeholder = 'Please choose…',
    ...rest
}: SelectFieldProps) {
    return (
        <div>
            <label htmlFor={id} className={labelClasses}>
                {label} {required && <span aria-hidden className="text-red-600">*</span>}
            </label>
            <select
                id={id}
                name={id}
                required={required}
                aria-required={required}
                aria-invalid={!!error}
                className={cn(baseInputClasses, 'appearance-none pr-10')}
                {...rest}>
                <option value="">{placeholder}</option>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {helpText && !error && <p className={helpClasses}>{helpText}</p>}
            {error && <p className={errorClasses}>{error}</p>}
        </div>
    )
}
