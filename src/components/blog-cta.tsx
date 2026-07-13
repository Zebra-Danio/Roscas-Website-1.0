import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function BlogCTA() {
    return (
        <aside
            className="my-12 rounded-2xl border p-8 md:p-10"
            style={{ backgroundColor: 'rgb(250, 249, 245)' }}>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                    <h3 className="text-2xl font-medium md:text-3xl">
                        Keep your circle. Lose the spreadsheet.
                    </h3>
                    <p className="text-muted-foreground">
                        Roscas is free, in early access, and looking for groups
                        like yours. Tell us about your circle and we&apos;ll be
                        in touch within 48 hours.
                    </p>
                </div>
                <Button asChild size="lg" className="shrink-0 gap-2">
                    <Link href="/your-circle">
                        <span>Bring your circle</span>
                        <ArrowRight className="size-4" />
                    </Link>
                </Button>
            </div>
        </aside>
    )
}
