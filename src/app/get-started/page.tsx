import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import GetStartedForm from './GetStartedForm'
import WalkthroughVideo from '@/components/walkthrough-video'
import { AppScreenshots, APP_SCREENSHOTS } from '@/components/app-screenshots'

export const metadata: Metadata = {
    title: 'Get Started – Try the Roscas App Free',
    description:
        'Be one of the first to try Roscas, the free app for managing your Paluwagan, Ajo, Esusu, Pardna, or Chama savings circle. Join our early access and help shape the app.',
    openGraph: {
        title: 'Get Started – Try the Roscas App Free',
        description:
            'Join Roscas early access. Free Android app for managing community savings circles. We respond within 48 hours.',
    },
}

export default function GetStartedPage() {
    return (
        <main className="pt-28 md:pt-32">
            <section className="mx-auto max-w-3xl px-6 pb-10 text-center">
                <h1 className="text-balance text-4xl font-medium md:text-5xl lg:text-6xl">
                    Be one of the first to try Roscas
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
                    Roscas is a free Android app that helps you run your savings
                    circle &mdash; Paluwagan, Ajo, Pardna, Esusu, Chama or any
                    rotating group &mdash; with less admin and more trust. We&apos;re
                    in early access. The first 50 organisers shape what Roscas becomes.
                </p>
                <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
                    Tell us a little about your circle and we&apos;ll be in touch within 48 hours.
                </p>
            </section>

            <section className="mx-auto max-w-4xl px-6 pb-12">
                <Link
                    href="/your-circle"
                    className="group flex items-center justify-between gap-4 rounded-2xl border p-5 shadow-sm transition-colors hover:border-primary/40 md:p-6"
                    style={{ backgroundColor: 'rgb(250, 249, 245)' }}>
                    <div>
                        <p className="font-medium">
                            Already running a circle?
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Keep your circle, lose the spreadsheet &mdash; bring
                            the group you already have.
                        </p>
                    </div>
                    <ArrowRight
                        className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1"
                        aria-hidden
                    />
                </Link>

                <div className="mt-12 grid items-start gap-10 md:grid-cols-2">
                    <WalkthroughVideo />
                    <div className="space-y-6">
                        <p className="text-center text-sm text-muted-foreground md:text-left">
                            A quick look inside the app &mdash; the walkthrough
                            on the left, and a couple of the screens your circle
                            will see every day.
                        </p>
                        <AppScreenshots
                            shots={[
                                APP_SCREENSHOTS.members,
                                APP_SCREENSHOTS.payout,
                            ]}
                        />
                    </div>
                </div>
            </section>

            <section
                className="py-12 md:py-16"
                style={{ backgroundColor: 'rgb(250, 249, 245)' }}>
                <div className="mx-auto max-w-2xl px-6">
                    <div className="rounded-2xl border bg-background p-6 shadow-sm md:p-10">
                        <GetStartedForm />
                    </div>
                    <div className="mx-auto mt-8 max-w-xl rounded-xl border bg-background/60 p-5 text-sm text-muted-foreground">
                        <p>
                            <strong className="text-foreground">
                                Already running circles in your community?
                            </strong>{' '}
                            If you&apos;re well-connected and already trusted by
                            other organisers, take a look at our{' '}
                            <Link
                                href="/community-liaison"
                                className="text-primary font-medium hover:underline">
                                Community Liaison
                            </Link>{' '}
                            role &mdash; a short paid sprint to help us reach
                            the right people.
                        </p>
                    </div>
                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Prefer email? Write to{' '}
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
