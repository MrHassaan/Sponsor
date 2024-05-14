//
require('dotenv').config();
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Route to handle Stripe payments
router.post('/create-checkout-session', async (req, res) => {
    try {
         const eventData = req.body.eventData;
        console.log(eventData);
        console.log(`${req.protocol}://${req.get('host')}/${eventData.eventlogo}`);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'pkr',
                    product_data: {
                        name: eventData.title,
                        images: [`${req.protocol}://${req.get('host')}/${eventData.eventlogo}`],
                        metadata: {
                            id: eventData.organizer,
                        },
                    },
                    unit_amount: 500*1000, // Amount in cents
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://your-website.com/success', // Redirect URL after successful payment
            cancel_url: 'http://your-website.com/cancel', // Redirect URL if payment is canceled
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).send('Error creating checkout session');
    }
});

module.exports = router;
