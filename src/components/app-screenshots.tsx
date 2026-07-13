import Image from 'next/image'
import { cn } from '@/lib/utils'

export type Screenshot = {
    src: string
    alt: string
    caption: string
}

export const APP_SCREENSHOTS = {
    home: {
        src: '/images/app/01_home.png',
        alt: 'Roscas app home screen showing your circles at a glance',
        caption: 'All your circles in one place',
    },
    circle: {
        src: '/images/app/02_circle.png',
        alt: 'Circle overview showing contribution amount, pot and next meeting',
        caption: 'Your circle, your rules',
    },
    members: {
        src: '/images/app/03_members.png',
        alt: 'Members list showing who has paid this round',
        caption: "See who's paid at a glance",
    },
    contributions: {
        src: '/images/app/04_contributions.png',
        alt: 'Contribution tracking screen with payment history',
        caption: 'Every contribution recorded',
    },
    payout: {
        src: '/images/app/05_payout.png',
        alt: 'Payout order showing whose turn is next',
        caption: 'Whose turn is next — no arguments',
    },
    delight: {
        src: '/images/app/06_delight.png',
        alt: 'Celebration screen when a payout lands',
        caption: 'Payday for someone in the circle',
    },
} satisfies Record<string, Screenshot>

export function AppScreenshots({
    shots,
    className,
}: {
    shots: Screenshot[]
    className?: string
}) {
    return (
        <div
            className={cn(
                'grid grid-cols-2 gap-4 sm:gap-6',
                shots.length >= 4 ? 'md:grid-cols-4' : 'md:grid-cols-3',
                className
            )}>
            {shots.map((shot) => (
                <figure key={shot.src} className="space-y-2">
                    <div className="overflow-hidden rounded-2xl border bg-background p-1.5 shadow-sm">
                        <Image
                            src={shot.src}
                            alt={shot.alt}
                            width={461}
                            height={1024}
                            className="w-full rounded-xl"
                        />
                    </div>
                    <figcaption className="text-center text-xs text-muted-foreground">
                        {shot.caption}
                    </figcaption>
                </figure>
            ))}
        </div>
    )
}
