import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import WalkthroughVideo from '@/components/walkthrough-video'
import { AppScreenshots, APP_SCREENSHOTS } from '@/components/app-screenshots'

export default function AppPreview() {
    return (
        <section
            className="py-16 md:py-24"
            style={{ backgroundColor: 'rgb(250, 249, 245)' }}>
            <div className="mx-auto max-w-5xl px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-balance text-3xl font-medium md:text-4xl">
                        A quick look inside the app
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        Ninety seconds from setting up a circle to seeing whose
                        turn is next. Roscas is in early access and always free
                        &mdash; it never touches the money and never takes a cut
                        of the pot.
                    </p>
                </div>

                <div className="mt-12 grid items-start gap-10 md:grid-cols-2">
                    <WalkthroughVideo />
                    <AppScreenshots
                        shots={[
                            APP_SCREENSHOTS.circle,
                            APP_SCREENSHOTS.payout,
                        ]}
                    />
                </div>

                <div className="mt-12 text-center">
                    <Button asChild size="lg" className="gap-2 px-6">
                        <Link href="/your-circle">
                            <span>Bring your circle</span>
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
