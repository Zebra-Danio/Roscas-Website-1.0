import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AmbassadorCTA() {
    return (
        <section className="py-12 md:py-20" style={{ backgroundColor: 'rgb(250, 249, 245)' }}>
            <div className="mx-auto max-w-4xl px-6 text-center">
                <h2 className="text-balance text-3xl font-medium md:text-4xl">
                    Know someone who&apos;d be perfect to help us grow?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
                    We&apos;re hiring a paid Community Liaison to introduce
                    Roscas to Filipino, Nigerian, and Caribbean savings circles
                    across the UK. Part-time, flexible, and meaningful.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button asChild size="lg" className="gap-2">
                        <Link href="/community-liaison">
                            <span>See the role</span>
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                    <Link
                        href="/community-liaison#apply"
                        className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                        Or apply directly
                    </Link>
                </div>
            </div>
        </section>
    )
}
