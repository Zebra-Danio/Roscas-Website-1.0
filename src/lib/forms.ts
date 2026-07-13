/**
 * Form submission helper using Web3Forms.
 *
 * Web3Forms posts form data straight to team@roscas.io (the email registered
 * with the access key). The access key is a public client-side identifier,
 * not a secret credential.
 *
 * Docs: https://docs.web3forms.com/
 */

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export type FormPayload = Record<string, string | number | undefined>;

export interface FormSubmitResult {
    success: boolean;
    message: string;
}

export async function submitForm(
    payload: FormPayload,
    options: { subject: string; from_name?: string }
): Promise<FormSubmitResult> {
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!accessKey) {
        return {
            success: false,
            message:
                'Form is not configured. Please set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local and rebuild.',
        };
    }

    // Wire the submitter's email into Web3Forms' replyto field so replying
    // to a notification email goes to the person, not back to ourselves.
    const replyto =
        typeof payload.email === 'string' && payload.email.includes('@')
            ? { replyto: payload.email }
            : {};

    const body = {
        access_key: accessKey,
        subject: options.subject,
        from_name: options.from_name ?? 'Roscas Website',
        ...replyto,
        ...payload,
    };

    try {
        const response = await fetch(WEB3FORMS_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok && data.success) {
            return {
                success: true,
                message: 'Thanks — your message is on its way.',
            };
        }

        return {
            success: false,
            message:
                data.message ||
                'Sorry, something went wrong sending your message. Please try again or email team@roscas.io directly.',
        };
    } catch {
        return {
            success: false,
            message:
                'Could not reach our submission service. Please check your connection and try again, or email team@roscas.io directly.',
        };
    }
}
