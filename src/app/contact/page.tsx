'use client' // Assuming the header or other elements might need client-side hooks

import { HeroHeader } from '@/components/hero5-header' // Reuse the existing header
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Mail } from 'lucide-react'

export default function ContactPage() {
    return (
        <>
            {/* Reusing the existing header */}
            <HeroHeader />

            {/* Main contact section */}
            <section className="py-12 md:py-20"> {/* Consistent padding */}
                <div className="mx-auto max-w-3xl px-6 text-center space-y-8"> {/* Centered content */}

                    {/* Title */}
                    <h1 className="text-4xl font-medium lg:text-5xl">
                        Get in Touch
                    </h1>

                    {/* Introductory Text */}
                    <p className="text-lg text-muted-foreground">
                        We'd love to hear from you! Whether you have questions about <strong>RoscasApp</strong>, ideas to share, feedback on our approach, or are interested in potential partnerships, please don't hesitate to reach out. We're building <strong>RoscasApp for the community</strong>, and your input is incredibly valuable to us.
                    </p>
                    
                    <p className="text-lg text-muted-foreground">
                        We are preparing for the <strong>initial launch</strong> of RoscasApp and are looking for <strong>enthusiastic early users</strong>! If you currently participate in any form of community savings circle (like Paluwagan, Ajo, Esusu, Chama, Tanda, Committee, or similar groups) and are interested in becoming a <strong>beta tester</strong> – getting exclusive early access and helping shape the app's future with your feedback – please send us a message using the button below.
                    </p>
                    
                    <p className="text-lg text-muted-foreground">
                        Your insights will be crucial in making RoscasApp the best possible tool for communities like yours. As a small thank you for your valuable time and insights, selected active beta testers may receive a <strong>token of our appreciation</strong>.
                    </p>

                    {/* Image Placeholder */}
                    <div className="relative aspect-video w-full max-w-xl mx-auto overflow-hidden rounded-2xl border shadow-lg">
                        {/* You'll need to replace this src with your desired image path */}
                        <Image
                            src="/images/reach.jpg" // Placeholder - CHANGE THIS
                            alt="Contact illustration or photo"
                            fill // Use fill to cover the container
                            className="object-cover"
                        />
                    </div>

                    {/* Mailto Button */}
                    <div className="pt-6">
                        <Button asChild size="lg" className="gap-2">
                            <a href="mailto:team@roscas.io">
                                <Mail className="size-4" />
                                Send us an Email
                            </a>
                        </Button>
                        <p className="text-sm text-muted-foreground mt-3">
                            (This will open your default email application)
                        </p>
                    </div>

                     {/* Optional: Link back to home */}
                     <div className="pt-8">
                         <Link href="/" className="text-sm text-primary hover:underline">
                             &larr; Back to Home
                         </Link>
                     </div>
                </div>
            </section>
        </>
    )
} 