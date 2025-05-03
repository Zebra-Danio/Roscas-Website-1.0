import { UsersRound, CircleDollarSign, BellRing, Calendar, ShieldCheck, Gift } from 'lucide-react'

export default function Features() {
    return (
        <section id="features" className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-4xl font-medium lg:text-5xl">Everything You Need to Manage Your Savings Circle</h2>
                    <p>The Roscas App provides simple, powerful tools to make running your Paluwagan, Ajo, or Esusu easier and more transparent.</p>
                </div>

                <div className="relative mx-auto grid max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <UsersRound className="size-4" />
                            <h3 className="text-sm font-medium">Easy Group Setup & Management</h3>
                        </div>
                        <p className="text-sm">Create your circle in minutes, invite members easily via link, and set clear, agreed-upon rules for contributions and payouts upfront.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <CircleDollarSign className="size-4" />
                            <h3 className="text-sm font-medium">Transparent Contribution Tracking</h3>
                        </div>
                        <p className="text-sm">See exactly who has paid and when, all in one simple view. Reduce confusion and build trust with clear digital records accessible 24/7 to everyone in the group.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <BellRing className="size-4" />

                            <h3 className="text-sm font-medium">Friendly Automated Reminders</h3>
                        </div>
                        <p className="text-sm">Gentle, automatic reminders help everyone stay on track with their contributions, reducing the need for awkward manual follow-ups by the organiser.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Calendar className="size-4" />

                            <h3 className="text-sm font-medium">Clear Payout Scheduling</h3>
                        </div>
                        <p className="text-sm">Easily view the upcoming payout schedule so everyone knows when it's their turn. Organisers can digitally confirm when payouts have been made.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="size-4" />

                            <h3 className="text-sm font-medium">Secure & Reliable Records</h3>
                        </div>
                        <p className="text-sm">Your group's information and transaction history are kept secure with modern login protection and reliable record-keeping. We use blockchain technology subtly in the background to enhance data integrity and peace of mind.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Gift className="size-4" />

                            <h3 className="text-sm font-medium">Optional 'Tip' Flexibility</h3>
                        </div>
                        <p className="text-sm">For groups that want extra flexibility, our unique optional 'Tip' feature allows members to show appreciation or express interest in earlier payout slots using community-earned tokens.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
