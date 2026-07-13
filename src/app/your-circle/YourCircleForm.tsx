'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    TextField,
    TextareaField,
    SelectField,
} from '@/components/forms/FormField'
import { FormStatus } from '@/components/forms/FormStatus'
import { submitForm } from '@/lib/forms'

const TRADITION_OPTIONS = [
    { value: 'Paluwagan', label: 'Paluwagan (Filipino)' },
    { value: 'Ajo', label: 'Ajo (Nigerian)' },
    { value: 'Esusu', label: 'Esusu (West African)' },
    { value: 'Pardna', label: 'Pardna (Caribbean)' },
    { value: 'Chama', label: 'Chama (Kenyan)' },
    { value: 'Dhukuti', label: 'Dhukuti (Nepali)' },
    { value: 'Other', label: 'Other / our own tradition' },
]

const ROLE_OPTIONS = [
    { value: 'I organise it', label: 'I organise it' },
    { value: "I'm a member", label: "I'm a member" },
]

export default function YourCircleForm() {
    const [submitting, setSubmitting] = useState(false)
    const [result, setResult] = useState<
        { success: boolean; message: string } | null
    >(null)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (submitting) return
        setSubmitting(true)
        setResult(null)

        const formData = new FormData(e.currentTarget)
        const payload = {
            name: String(formData.get('name') || ''),
            email: String(formData.get('email') || ''),
            whatsapp_or_phone: String(formData.get('whatsapp_or_phone') || ''),
            tradition: String(formData.get('tradition') || ''),
            members_count: String(formData.get('members_count') || ''),
            tracking_today: String(formData.get('tracking_today') || ''),
            role: String(formData.get('role') || ''),
        }

        const res = await submitForm(payload, {
            subject: `Your Circle signup — ${payload.name}`,
            from_name: 'Roscas — Your Circle',
        })
        setResult(res)
        setSubmitting(false)

        if (res.success) {
            ;(e.target as HTMLFormElement).reset()
        }
    }

    if (result?.success) {
        return (
            <FormStatus
                variant="success"
                title="Thank you — your circle's details are with us."
                message="We'll be in touch within 48 hours. Keep an eye on your inbox (and spam folder, just in case)."
            />
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <TextField
                id="name"
                label="Your name"
                required
                autoComplete="name"
                placeholder="e.g. Maria Santos"
            />
            <TextField
                id="email"
                label="Email address"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                helpText="We'll only use this to reply."
            />
            <TextField
                id="whatsapp_or_phone"
                label="WhatsApp or phone"
                type="tel"
                autoComplete="tel"
                placeholder="e.g. +44 7700 900123"
                helpText="If it's easier to chat on WhatsApp, pop your number here."
            />

            <fieldset className="space-y-5 rounded-xl border p-4">
                <legend className="px-1 text-sm font-medium">
                    Tell us about your circle
                </legend>
                <SelectField
                    id="tradition"
                    label="Which tradition?"
                    required
                    options={TRADITION_OPTIONS}
                />
                <TextField
                    id="members_count"
                    label="How many people in your circle?"
                    inputMode="numeric"
                    placeholder="e.g. 12"
                />
                <TextareaField
                    id="tracking_today"
                    label="How do you keep track today?"
                    rows={3}
                    placeholder="e.g. a spreadsheet plus a WhatsApp group"
                    helpText="Optional — notebook, spreadsheet, WhatsApp, memory…"
                />
            </fieldset>

            <SelectField
                id="role"
                label="Your role in the circle"
                required
                options={ROLE_OPTIONS}
            />

            {result && !result.success && (
                <FormStatus
                    variant="error"
                    title="Something went wrong"
                    message={result.message}
                />
            )}

            <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full">
                {submitting ? 'Sending…' : 'Bring my circle to Roscas'}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
                By submitting, you agree we can contact you about Roscas early
                access. We won&apos;t share your details with anyone else.
            </p>
        </form>
    )
}
