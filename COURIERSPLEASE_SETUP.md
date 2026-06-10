# CouriersPlease Delivery Updates

The admin Orders page now supports CouriersPlease tracking:

1. Open an order in `/admin/orders`.
2. Enter the CouriersPlease tracking number.
3. Select **Mark shipped**.
4. The order is marked as shipped, tracking details are saved, and the
   customer receives an email when delivery email credentials are configured.
5. Marking the order as delivered sends a delivery confirmation email.

## Customer Email Configuration

Add these server-side environment variables locally and in Vercel:

```env
RESEND_API_KEY=re_...
DELIVERY_FROM_EMAIL=Maison de Parfum <orders@your-verified-domain.com>
```

`DELIVERY_FROM_EMAIL` must use a sending domain verified in Resend.

## Automatic CouriersPlease Status Sync

CouriersPlease lists API integration as part of its custom business solutions.
Ask the CouriersPlease account manager to enable API access and provide:

- API documentation and base URL
- Production and test credentials
- Tracking-status endpoint or webhook documentation
- Webhook signing or authentication requirements

Once supplied, the carrier statuses can be mapped to the website order statuses:

| CouriersPlease event | Website status |
| --- | --- |
| Booked / label created | `processing` |
| Picked up / in transit / onboard for delivery | `shipped` |
| Delivered | `delivered` |
| Cancelled | `cancelled` |

The additive database migration is stored in
`db/migrations/001_add_order_tracking.sql`.
