'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { TextField, TextareaField } from '@/components/forms/FormField'
import { FormStatus } from '@/components/forms/FormStatus'
import { submitForm } from '@/lib/forms'

export default function CommunityLiaisonForm() {
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
            about: String(formData.get('about') || ''),
            referrer: String(formData.get('referrer') || ''),
        }

        const res = await submitForm(payload, {
            subject: `Community Liaison application — ${payload.name}`,
            from_name: 'Roscas — Liaison Application',
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
                title="Thank you — your application is with us."
                message="We read every application personally. Expect to hear back from us within a week."
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
                placeholder="e.g. Aaron Okafor"
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
                id="about"
                label="Tell us about yourself and your community connections"
                required
                rows={6}
                placeholder="Where do you live in the UK? Which communities are you part of? Do you know people who run savings circles? Anything you'd like us to know about you."
            />
            <TextField
                id="referrer"
                label="How did you find us?"
                placeholder="e.g. Instagram, a friend, search…"
                helpText="Optional."
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
                {submitting ? 'Sending…' : 'Submit application'}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
                By submitting, you agree we can email you about this role. We
                won&apos;t share your details with anyone else.
            </p>
        </form>
    )
}
