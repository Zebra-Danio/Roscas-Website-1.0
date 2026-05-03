import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
    title: 'Contact Us – Join the Roscas Beta Program',
    description:
        'Get in touch with the Roscas team. Join our beta programme for early access to the free community savings circle app. We welcome feedback from Paluwagan, Ajo, Esusu, and Chama groups.',
    openGraph: {
        title: 'Contact Us – Join the Roscas Beta Program',
        description:
            'Interested in shaping the future of community savings? Contact us to join the Roscas beta programme and get early access.',
    },
}

export default function ContactPage() {
    return (
        <>
            <section className="py-12 md:py-20">
                <div className="mx-auto max-w-3xl px-6 text-center space-y-8"> {/* Centered content */}

                    {/* Title */}
                    <h1 className="text-4xl font-medium lg:text-5xl">
                        Get in Touch
                    </h1>

                    {/* Introductory Text */}
                    <p className="text-lg text-muted-foreground">
                        We&apos;d love to hear from you! Whether you have questions about <strong>RoscasApp</strong>, ideas to share, feedback on our approach, or are interested in potential partnerships, please don&apos;t hesitate to reach out. We&apos;re building <strong>RoscasApp for the community</strong>, and your input is incredibly valuable to us.
                    </p>
                    
                    <p className="text-lg text-muted-foreground">
                        We are preparing for the <strong>initial launch</strong> of RoscasApp and are looking for <strong>enthusiastic early users</strong>! If you currently participate in any form of community savings circle (like Paluwagan, Ajo, Esusu, Chama, Tanda, Committee, or similar groups) and are interested in becoming a <strong>beta tester</strong> – getting exclusive early access and helping shape the app&apos;s future with your feedback – please send us a message using the button below.
                    </p>
                    
                    <p className="text-lg text-muted-foreground">
                        Your insights will be crucial in making RoscasApp the best possible tool for communities like yours. As a small thank you for your valuable time and insights, selected active beta testers may receive a <strong>gift of our appreciation</strong>.
                    </p>

                    <div className="relative aspect-video w-full max-w-xl mx-auto overflow-hidden rounded-2xl border shadow-lg">
                        <Image
                            src="/images/reach.jpg"
                            alt="Contact illustration"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="mx-auto max-w-xl pt-6">
                        <div className="rounded-2xl border bg-background p-6 shadow-sm md:p-8">
                            <ContactForm />
                        </div>
                        <p className="mt-4 text-center text-sm text-muted-foreground">
                            Or email us directly at{' '}
                            <a
                                href="mailto:team@roscas.io"
                                className="text-primary font-medium hover:underline">
                                team@roscas.io
                            </a>
                        </p>
                    </div>

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