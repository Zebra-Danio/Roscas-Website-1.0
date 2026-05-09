'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    SelectField,
    TextField,
    TextareaField,
} from '@/components/forms/FormField'
import { FormStatus } from '@/components/forms/FormStatus'
import { submitForm } from '@/lib/forms'

const TRIED_ROSCAS_OPTIONS = [
    {
        value: "Yes — I've signed up as a Beta Organiser",
        label: "Yes — I've signed up as a Beta Organiser",
    },
    {
        value: "Not yet — but I'd be happy to before we talk",
        label: "Not yet — but I'd be happy to before we talk",
    },
    {
        value: "I'd prefer to discuss the role without testing first",
        label: "I'd prefer to discuss the role without testing first",
    },
]

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
            tried_roscas: String(formData.get('tried_roscas') || ''),
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
            <SelectField
                id="tried_roscas"
                label="Have you tried Roscas yourself?"
                options={TRIED_ROSCAS_OPTIONS}
                helpText={
                    <>
                        Many of our Community Liaisons come through the Beta
                        Organiser route &mdash; you can{' '}
                        <Link
                            href="/get-started"
                            className="text-primary font-medium hover:underline">
                            sign up for that here
                        </Link>{' '}
                        if you&apos;d like to try the app first.
                    </>
                }
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
