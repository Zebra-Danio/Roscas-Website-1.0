import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CommunityLiaisonForm from './CommunityLiaisonForm'

export const metadata: Metadata = {
    title: 'Community Liaison — Help Your Community Discover Roscas',
    description:
        'A few hours a week, real conversations, real impact. We are looking for a paid Community Liaison to introduce Roscas to Filipino, Nigerian, and Caribbean savings circles in the UK.',
    openGraph: {
        title: 'Community Liaison Role — Roscas',
        description:
            'A few hours a week having conversations in Facebook groups, WhatsApp chats, at church, or over coffee. £500/month plus £25 per organiser. 4-week term to start.',
    },
}

const offering = [
    '£500 per month, paid monthly',
    '£25 for every organiser you introduce who commits to running their circle on Roscas',
    '4-week initial term, with the option to extend based on what we learn together',
    'Direct work with the founder — your voice helps shape how Roscas reaches the communities that need it most',
]

const lookingFor = [
    'Someone genuinely connected and trusted within Filipino, Nigerian, or Caribbean communities in the UK',
    'You probably already know people who run savings circles — or are part of one yourself',
    'A natural communicator who is comfortable starting conversations, online or in person',
    'No tech background needed — you handle the introductions, we handle the product',
    'You believe community savings traditions deserve modern tools that respect how they actually work',
    'Reliable, organised, and happy to share what you are learning with us',
]

export default function CommunityLiaisonPage() {
    return (
        <main className="pt-28 md:pt-32">
            <section className="mx-auto max-w-3xl px-6 pb-10 text-center">
                <h1 className="text-balance text-4xl font-medium md:text-5xl lg:text-6xl">
                    We&apos;re looking for someone special
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
                    A few hours a week having conversations &mdash; in Facebook
                    groups, WhatsApp chats, at church, or over coffee &mdash;
                    could help thousands of people across the UK run their
                    savings circles with less stress and more trust.
                </p>
                <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
                    That&apos;s the role. It&apos;s paid, it&apos;s flexible, and
                    it matters.
                </p>
            </section>

            <section className="mx-auto max-w-3xl px-6 py-10">
                <h2 className="text-2xl font-medium md:text-3xl">
                    What we&apos;re offering
                </h2>
                <ul className="mt-6 space-y-4">
                    {offering.map(item => (
                        <li key={item} className="flex items-start gap-3">
                            <span
                                aria-hidden
                                className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <Check className="size-3.5 text-primary" />
                            </span>
                            <span className="text-base text-foreground/90">
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mx-auto max-w-3xl px-6 py-10">
                <h2 className="text-2xl font-medium md:text-3xl">
                    Who we&apos;re looking for
                </h2>
                <ul className="mt-6 space-y-4">
                    {lookingFor.map(item => (
                        <li key={item} className="flex items-start gap-3">
                            <span
                                aria-hidden
                                className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <Check className="size-3.5 text-primary" />
                            </span>
                            <span className="text-base text-foreground/90">
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mx-auto max-w-3xl px-6 pb-4 text-center">
                <p className="text-lg text-muted-foreground">
                    Sound like you, or like someone you know? We&apos;d love to
                    hear from you.
                </p>
                <div className="mt-6">
                    <Button asChild size="lg" className="gap-2">
                        <Link href="#apply">
                            <span>Apply now</span>
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </section>

            <section
                id="apply"
                className="mt-10 py-12 md:py-16"
                style={{ backgroundColor: 'rgb(250, 249, 245)' }}>
                <div className="mx-auto max-w-2xl px-6">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-medium">Tell us about you</h2>
                        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                            A few short questions. We read every application
                            personally and reply within a week.
                        </p>
                    </div>
                    <div className="rounded-2xl border bg-background p-6 shadow-sm md:p-10">
                        <CommunityLiaisonForm />
                    </div>
                </div>
            </section>
        </main>
    )
}
