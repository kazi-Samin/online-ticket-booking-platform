import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { auth } from '@/lib/auth'

export async function POST(request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

console.log('origin:', origin);

        const sessionData = await auth.api.getSession({
            headers: await headers(),
        });

        const email = sessionData?.user?.email;

        const formData = await request.formData()
        const bookingId = formData.get('bookingId')
        const totalAmount = formData.get('totalAmount')
        const ticketTitle = formData.get('ticketTitle')

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: email,
            client_reference_id: bookingId,
            line_items: [
                {
                    price_data: {
                        currency: 'bdt',
                        product_data: {
                            name: ticketTitle || 'Ticket Booking',
                        },
                        unit_amount: Number(totalAmount) * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
          success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            //   cancel_url: `${origin}/`,
        });

        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}