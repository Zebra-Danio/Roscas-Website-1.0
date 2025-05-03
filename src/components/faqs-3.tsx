'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import Link from 'next/link'

type FAQItem = {
    id: string
    icon: IconName
    question: string
    answer: string
}

export default function FAQsThree() {
    const faqItems: FAQItem[] = [
        {
            id: 'item-1',
            icon: 'tag',
            question: 'Is RoscasApp really free to use?',
            answer: 'Yes! The core features for managing your ROSCA group – setting up circles, inviting members, tracking contributions, managing schedules, and communicating within the app – are completely free for all members.',
        },
        {
            id: 'item-2',
            icon: 'wallet',
            question: 'Does RoscasApp handle the money transfers between members?',
            answer: 'No. RoscasApp is a tool specifically designed for managing and tracking your savings circle contributions and payouts. You and your group members continue to exchange money directly using your preferred methods (e.g., cash, bank transfer, mobile money). The app simply provides a clear, shared record of these agreed transactions.',
        },
        {
            id: 'item-3',
            icon: 'alert-circle',
            question: 'What happens if someone in my group misses a payment?',
            answer: 'The Roscas App helps improve transparency by clearly tracking who has paid and sending automatic reminders to help prevent missed payments. However, the app does not guarantee payments or insure against defaults. Managing missed payments remains the responsibility of the group, based on the rules you agreed upon when forming your circle, just like in a traditional ROSCA.',
        },
        {
            id: 'item-4',
            icon: 'shield',
            question: 'How secure is my groups data and information?',
            answer: 'We prioritize your security and privacy. We use secure login methods provided by Privy.io and employ robust data protection measures to keep your groups information safe. Our background use of blockchain technology adds an extra layer of integrity and reliability to your records.',
        },
        {
            id: 'item-5',
            icon: 'sparkles',
            question: 'What is the \'Tip\' feature? Is it required?',
            answer: 'The \'Tip\' feature is completely optional. It\'s a tool that some groups might choose to activate if they want a flexible way for members to show appreciation or express interest in swapping payout slots using community-earned tokens within the app. Your group decides together if and how you want to use optional features like this, based on your own rules.',
        },
        {
            id: 'item-6',
            icon: 'users',
            question: 'How do I add members to my savings circle?',
            answer: 'Once an organizer creates a circle in the app, they can easily share a unique invitation link with potential members via WhatsApp, SMS, email, or any other messaging platform. Members simply click the link to join the group within the app.',
        },
        {
            id: 'item-7',
            icon: 'layers',
            question: 'Can I be part of more than one ROSCA circle using the app?',
            answer: 'Absolutely. You can create or be a member of multiple different ROSCA circles simultaneously within the RoscasApp, keeping all your group activities organised in one place.',
        },
        {
            id: 'item-8',
            icon: 'map-pin',
            question: 'Is this app available outside the UK?',
            answer: 'Currently, our pilot launch (starting [Approximate Launch Date/Quarter]) is focused specifically on serving Filipino and Nigerian diaspora communities within the United Kingdom. We plan to explore expansion to other regions in the future based on feedback and local requirements.',
        },
    ]

    return (
        <section id="faq" className="bg-muted dark:bg-background py-20">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-20">
                            <h2 className="mt-4 text-3xl font-bold">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground mt-4">
                                Can&apos;t find what you&apos;re looking for? Contact {' '}
                                <Link
                                    href="#"
                                    className="text-primary font-medium hover:underline">
                                    our team
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-2">
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="bg-background shadow-xs rounded-lg border px-4 last:border-b">
                                    <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-6">
                                                <DynamicIcon
                                                    name={item.icon}
                                                    className="m-auto size-4"
                                                />
                                            </div>
                                            <span className="text-base">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5">
                                        <div className="px-9">
                                            <p className="text-base">{item.answer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
