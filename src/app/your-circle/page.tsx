import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Sparkles } from 'lucide-react'
import YourCircleForm from './YourCircleForm'
import WalkthroughVideo from '@/components/walkthrough-video'
import { AppScreenshots, APP_SCREENSHOTS } from '@/components/app-screenshots'

export const metadata: Metadata = {
    title: 'Keep Your Circle. Lose the Spreadsheet. – Free Savings Circle App',
    description:
        'Already running a Paluwagan, Ajo, Esusu, Pardna or Chama? Roscas is the free savings circle app that keeps the tracking clean and transparent — who has paid, whose turn is next, no chasing. Early access, always free.',
    openGraph: {
        title: 'Keep Your Circle. Lose the Spreadsheet. | Roscas',
        description:
            'The free app for people who already run a savings circle — Paluwagan, Ajo, Esusu, Pardna, Chama or your own tradition. Same circle, same trust, none of the admin.',
        images: [
            {
                url: '/images/app/02_circle.png',
                alt: 'Roscas app showing a savings circle overview',
            },
        ],
    },
}

const STAYS_THE_SAME = [
    'Your people — the same trusted members, invited by you',
    'Your rules — the amount, the rhythm, the turn order your group agreed',
    'Your tradition — Paluwagan, Ajo, Esusu, Pardna, Chama, or your own way',
    'Your money — Roscas never touches the pot; it moves the way it always has',
]

const GETS_EASIER = [
    "Who's paid — everyone sees the same live record, so nobody has to ask",
    'Whose turn is next — the payout order is there for the whole circle to see',
    'No chasing — gentle reminders go out automatically, not from you',
    'No spreadsheet — the notebook and the late-night reconciling are retired',
]

export default function YourCirclePage() {
    return (
        <main className="pt-28 md:pt-32">
            {/* Pitch */}
            <section className="mx-auto max-w-4xl px-6 pb-12 text-center">
                <h1 className="text-balance text-4xl font-medium md:text-5xl lg:text-6xl">
                    Keep your circle. Lose the spreadsheet.
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
                    You already run a savings circle &mdash; Paluwagan, Ajo,
                    Esusu, Pardna, Chama, or your own tradition. Roscas keeps
                    the tracking clean, transparent and free, so you can focus
                    on your people.
                </p>

                <div className="mx-auto mt-12 grid max-w-3xl gap-6 text-left md:grid-cols-2">
                    <div className="rounded-2xl border bg-background p-6 shadow-sm">
                        <h2 className="text-lg font-medium">
                            What stays the same
                        </h2>
                        <ul className="mt-4 space-y-3">
                            {STAYS_THE_SAME.map((item) => (
                                <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-2xl border p-6 shadow-sm" style={{ backgroundColor: 'rgb(250, 249, 245)' }}>
                        <h2 className="text-lg font-medium">
                            What gets easier
                        </h2>
                        <ul className="mt-4 space-y-3">
                            {GETS_EASIER.map((item) => (
                                <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                                    <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Walkthrough video */}
            <section className="py-12 md:py-16" style={{ backgroundColor: 'rgb(250, 249, 245)' }}>
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h2 className="text-3xl font-medium md:text-4xl">
                        See it in action
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                        A 90-second walk through the app &mdash; setting up a
                        circle, tracking contributions, and seeing whose turn
                        is next.
                    </p>
                    <WalkthroughVideo className="mt-8" />
                </div>
            </section>

            {/* Screenshots */}
            <section className="py-12 md:py-16">
                <div className="mx-auto max-w-4xl px-6">
                    <h2 className="text-center text-3xl font-medium md:text-4xl">
                        The record your whole circle can see
                    </h2>
                    <AppScreenshots
                        className="mt-10"
                        shots={[
                            APP_SCREENSHOTS.circle,
                            APP_SCREENSHOTS.members,
                            APP_SCREENSHOTS.payout,
                            APP_SCREENSHOTS.delight,
                        ]}
                    />
                </div>
            </section>

            {/* Early access framing + form */}
            <section className="py-12 md:py-16" style={{ backgroundColor: 'rgb(250, 249, 245)' }}>
                <div className="mx-auto max-w-2xl px-6">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-medium md:text-4xl">
                            Bring the circle you already run
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                            We&apos;re in early access. Try it with your circle
                            and help shape it &mdash; the app is free, always
                            will be, and never takes a cut of the pot.
                        </p>
                    </div>
                    <div className="rounded-2xl border bg-background p-6 shadow-sm md:p-10">
                        <YourCircleForm />
                    </div>
                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        New to savings circles?{' '}
                        <Link
                            href="/get-started"
                            className="text-primary font-medium hover:underline">
                            Start here instead
                        </Link>
                        {' '}&middot; Prefer email?{' '}
                        <a
                            href="mailto:team@roscas.io"
                            className="text-primary font-medium hover:underline">
                            team@roscas.io
                        </a>
                    </p>
                </div>
            </section>
        </main>
    )
}
