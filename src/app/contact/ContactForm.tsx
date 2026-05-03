'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { TextField, TextareaField } from '@/components/forms/FormField'
import { FormStatus } from '@/components/forms/FormStatus'
import { submitForm } from '@/lib/forms'

export default function ContactForm() {
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
            message: String(formData.get('message') || ''),
        }

        const res = await submitForm(payload, {
            subject: `Roscas contact form — ${payload.name}`,
            from_name: 'Roscas — Contact Form',
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
                title="Thanks — your message is on its way."
                message="We read every message and will reply as soon as we can."
            />
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5 text-left" noValidate>
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
            />
            <TextareaField
                id="message"
                label="Message"
                required
                rows={6}
                placeholder="Tell us a little about why you're getting in touch."
            />

            {result && !result.success && (
                <FormStatus
                    variant="error"
                    title="Something went wrong"
                    message={result.message}
                />
            )}

            <Button type="submit" size="lg" disabled={submitting} className="w-full">
                {submitting ? 'Sending…' : 'Send message'}
            </Button>
        </form>
    )
}
