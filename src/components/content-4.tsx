import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function ContentSection() {
    return (
        <section id="community" className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                    <h2 className="text-4xl font-medium">Trust, Transparency, and Community at Our Core</h2>
                    <div className="space-y-6">
                        <p>We believe deeply in the power of community savings. RoscasApp isn't trying to replace the vital connections of your Paluwagan, Ajo, or Esusu; we're here to support and strengthen them with technology designed around your needs. We provide simple tools to manage your circle smoothly, so you can focus on the trust and shared goals that truly matter.</p>
                        <p>
                        Built on the principle that value should <span className="font-bold">circulate within the community,</span> the Roscas App helps keep your hard-earned money local. We prioritize your trust and security, offering a reliable platform for record-keeping and communication, while you continue to manage your funds directly within your group.
                        </p>
                        <Button
                            asChild
                            variant="secondary"
                            size="sm"
                            className="gap-1 pr-1.5">
                            <Link href="#">
                                <span>Learn More About Our Community Focus</span>
                                <ChevronRight className="size-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
