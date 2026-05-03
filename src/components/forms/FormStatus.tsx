import { CheckCircle2, AlertCircle } from 'lucide-react'

type Variant = 'success' | 'error'

export function FormStatus({
    variant,
    title,
    message,
}: {
    variant: Variant
    title: string
    message: string
}) {
    const isSuccess = variant === 'success'
    const Icon = isSuccess ? CheckCircle2 : AlertCircle
    return (
        <div
            role="status"
            aria-live="polite"
            className={
                'flex items-start gap-3 rounded-lg border p-4 ' +
                (isSuccess
                    ? 'border-green-200 bg-green-50 text-green-900 dark:bg-green-950/40 dark:text-green-100 dark:border-green-900'
                    : 'border-red-200 bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-100 dark:border-red-900')
            }>
            <Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
            <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm opacity-90">{message}</p>
            </div>
        </div>
    )
}
