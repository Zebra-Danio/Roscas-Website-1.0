import { Heart, PiggyBank } from 'lucide-react'
import Image from 'next/image'

export default function ContentSection() {
    return (
        <section id="about" className="py-10 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">About Roscas: Empowering Communities</h2>
                <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
                    <div className="relative space-y-4">
                        <p className="text-muted-foreground">
                        Roscas was born from a deep <span className="text-accent-foreground font-bold">respect</span> for the power and resilience of traditional community savings practices like Paluwagan, Ajo, and Esusu. We saw the incredible value these circles bring but also the administrative challenges organizers and members often face with manual tracking, transparency, and managing payouts.  
                        </p>
                        <p className="text-muted-foreground">Our mission is simple: To provide a secure, user-friendly, and always-free digital tool that enhances these trusted systems without changing their core community spirit. We're passionate about leveraging technology thoughtfully for financial inclusion and community empowerment globally.</p>

                        <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Heart className="size-4" />
                                    <h3 className="text-sm font-medium">Community Focused:</h3>
                                </div>
                                <p className="text-muted-foreground text-sm">Built with deep respect for cultural traditions and designed specifically to support the needs of local savings groups.</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <PiggyBank className="size-4" />
                                    <h3 className="text-sm font-medium">Accessible & Free:</h3>
                                </div>
                                <p className="text-muted-foreground text-sm">Committed to providing an intuitive tool that's always free for core ROSCA management, ensuring everyone can benefit.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative mt-6 sm:mt-0">
                        <div className="bg-linear-to-b aspect-67/34 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
                            <Image
                                src="/images/women.jpg"
                                className="hidden rounded-[15px] dark:block"
                                alt="Group of women collaborating"
                                width={1206}
                                height={612}
                            />
                            <Image
                                src="/images/women.jpg"
                                className="rounded-[15px] shadow dark:hidden"
                                alt="Group of women collaborating"
                                width={1206}
                                height={612}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
