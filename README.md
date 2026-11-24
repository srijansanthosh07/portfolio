This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to load Inter and JetBrains Mono.

## Contact form email setup

The contact form sends messages through a server-side [Resend](https://resend.com/) integration. The API key is only read by the server and must not be exposed through a `NEXT_PUBLIC_` variable.

1. Create a free Resend account and add a domain you own in the [Resend Domains dashboard](https://resend.com/domains).
2. Publish the DNS records Resend provides and wait until the domain is verified. Resend requires a verified sending domain for delivery.
3. Create an API key in Resend.
4. Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (an address on the verified domain), and `CONTACT_TO_EMAIL` (the inbox that should receive messages). Set `SITE_URL` to the canonical public URL for accurate social metadata and sitemap links.
5. Restart the development server. Add the same variables to your hosting provider before deployment.

The free plan has usage limits; check the current Resend dashboard for its limits.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
