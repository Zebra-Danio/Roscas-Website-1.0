import { cn } from '@/lib/utils'
import Image from 'next/image'

export const Logo = ({ className }: { className?: string }) => {
    return (
        <Image
            className={cn('h-7 w-auto', className)}
            src="/images/roscas-logo2.png"
            alt="Roscas Logo"
            width={71}
            height={25}
        />
    )
}

export const LogoStroke = ({ className }: { className?: string }) => {
    return (
        <Image
            className={cn('h-7 w-auto', className)}
            src="/images/rosocas-icon2.png"
            alt="Roscas Icon"
            width={71} 
            height={25}
        />
    )
}
