import type { Metadata } from 'next'
import GetStartedForm from './GetStartedForm'

export const metadata: Metadata = {
    title: 'Get Started – Try the Roscas App Free',
    description:
        'Be one of the first to try Roscas, the free app for managing your Paluwagan, Ajo, Esusu, Pardna, or Chama savings circle. Join our beta and help shape the app.',
    openGraph: {
        title: 'Get Started – Try the Roscas App Free',
        description:
            'Join the Roscas beta. Free Android app for managing community savings circles. We respond within 48 hours.',
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
                    in early access and looking for groups who want to help shape it.
                </p>
                <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
                    Tell us a little about your circle and we&apos;ll be in touch within 48 hours.
                </p>
            </section>

            <section
                className="py-12 md:py-16"
                style={{ backgroundColor: 'rgb(250, 249, 245)' }}>
                <div className="mx-auto max-w-2xl px-6">
                    <div className="rounded-2xl border bg-background p-6 shadow-sm md:p-10">
                        <GetStartedForm />
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
