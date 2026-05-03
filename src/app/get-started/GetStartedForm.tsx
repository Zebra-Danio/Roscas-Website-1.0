'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { TextField, SelectField } from '@/components/forms/FormField'
import { FormStatus } from '@/components/forms/FormStatus'
import { submitForm } from '@/lib/forms'

const PARTICIPATION_OPTIONS = [
    { value: 'Yes — currently in a circle', label: 'Yes' },
    { value: 'No — not currently', label: 'No' },
    { value: "I'd like to join one", label: "I'd like to" },
]

const TRADITION_OPTIONS = [
    { value: 'Paluwagan', label: 'Paluwagan (Filipino)' },
    { value: 'Ajo', label: 'Ajo (Nigerian)' },
    { value: 'Pardna', label: 'Pardna (Caribbean)' },
    { value: 'Esusu', label: 'Esusu (West African)' },
    { value: 'Chama', label: 'Chama (Kenyan)' },
    { value: 'Other', label: 'Other / not sure' },
]

export default function GetStartedForm() {
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
            participation: String(formData.get('participation') || ''),
            tradition: String(formData.get('tradition') || ''),
            group_size: String(formData.get('group_size') || ''),
        }

        const res = await submitForm(payload, {
            subject: `New beta tester signup — ${payload.name}`,
            from_name: 'Roscas — Beta Signup',
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
                title="Thank you — your details are with us."
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
            <SelectField
                id="participation"
                label="Do you currently run or participate in a savings circle?"
                required
                options={PARTICIPATION_OPTIONS}
            />
            <SelectField
                id="tradition"
                label="Which community tradition?"
                required
                options={TRADITION_OPTIONS}
            />
            <TextField
                id="group_size"
                label="How many people in your group?"
                placeholder="e.g. 12"
                helpText="Optional. If you're not sure, leave blank."
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
                {submitting ? 'Sending…' : 'Sign me up for the beta'}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
                By submitting, you agree we can email you about the Roscas beta.
                We won&apos;t share your details with anyone else.
            </p>
        </form>
    )
}
