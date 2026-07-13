import { cn } from '@/lib/utils'

/**
 * Phone-framed embed of the app walkthrough video (720x1600 portrait, ~78s).
 * Plays inline on mobile; poster shows the app home screen until play.
 */
export default function WalkthroughVideo({
    className,
}: {
    className?: string
}) {
    return (
        <div className={cn('mx-auto w-full max-w-[300px]', className)}>
            <div className="overflow-hidden rounded-[2rem] border bg-background p-2 shadow-lg shadow-zinc-950/15">
                <video
                    className="aspect-[9/20] w-full rounded-[1.5rem] bg-black"
                    src="/videos/walkthrough_web.mp4"
                    controls
                    playsInline
                    preload="metadata"
                    poster="/images/app/01_home.png"
                    aria-label="Walkthrough of the Roscas app"
                />
            </div>
        </div>
    )
}
