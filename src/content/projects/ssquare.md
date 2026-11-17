---
title: SSquare
summary: A live booking site for a 24-hour sports arena — and behind it, an installable staff app that runs the whole business, from bookings and payments to expenses and reports.
year: 2026
order: 3
featured: true
role: Solo — design, full stack, deployment · built for a real client
stack: [Next.js, TypeScript, Supabase, Postgres, TanStack Query, Web Push, Tailwind]
live: https://ssquare-seven.vercel.app
repo: https://github.com/ssquarebusiness/ssquare
tone: sand
---

## Problem

SSquare is a 24-hour sports arena in Nadiad with a box-cricket and football turf and the city's only synthetic pickleball court. Bookings lived in phone calls, WhatsApp chats and memory: double bookings were possible, cash was hard to track across staff, and the owners had no clear view of revenue or expenses.

## Approach

From the outside it looks like a simple site that shows turf timings. Underneath, it's a complete operating system for the business, built in two parts.

**Public website** (English, ગુજરાતી and हिन्दी)

- Live slot availability for each court, seven days ahead, grouped into late night, morning, afternoon and evening
- Tap any free hour to send a prefilled booking request on WhatsApp or call
- Weekday and weekend rates per sport, facilities, gallery, Google reviews, map and FAQ
- Statically generated and built for local SEO (structured data, sitemap, per-language pages)

**Staff app** (installable on Android and iPhone)

- **Bookings** — create, edit, complete or cancel, with WhatsApp confirmation; cancelling asks whether to keep or refund the advance
- **Payments** — UPI or cash, with a record of **who collected the cash**, so money per person is always known; UPI screenshots are compressed on the phone before upload
- **Expenses** — log running costs by type
- **Analytics** — money collected vs spent each day, occupancy per court, a weekday × hour heatmap of busy times, sport mix, expense categories and top customers
- **Reports** — one-tap Excel and PDF exports
- **Staff and permissions** — owners have full access; caretakers get only what owners grant (today's bookings, all bookings, create bookings, expenses, analytics, reports)
- **Settings** — owners change prices per sport for weekdays and weekends without a redeploy
- **Push notifications** for new bookings and updates

## Architecture

Next.js 15 (App Router, TypeScript) on Vercel's Mumbai region, with Supabase providing Postgres, auth, storage and realtime. TanStack Query caches data on the device and realtime subscriptions keep every staff phone in sync.

- **No double booking, by construction** — a Postgres exclusion constraint makes overlapping bookings on the same court impossible, even if two phones save at the same instant
- **Row Level Security on every table** — caretakers can only read what their permissions allow, and the public site only ever receives busy times, never names or phone numbers
- **Everything in IST** — slot, pricing and reporting logic handles bookings that cross midnight
- **Runs on free tiers** — a daily cron keeps the database awake and deletes UPI screenshots after 180 days; a GitHub Action takes a full database backup every Sunday

| Layer | Technology |
|---|---|
| App | Next.js 15, React 19, TypeScript, Tailwind CSS 4 |
| Data | Supabase Postgres, RLS policies, RPCs, Realtime, Storage |
| Client state | TanStack Query with on-device persistence |
| i18n | next-intl (English, Gujarati, Hindi) |
| Reports | ExcelJS, jsPDF |
| Notifications | Web Push (VAPID), installable PWA |
| Ops | Vercel cron, GitHub Actions backups, Vitest + SQL behaviour tests |

## Results

- Live in production, giving the owners and their caretaker one place to run day-to-day operations
- Double bookings eliminated at the database level, not just in the UI
- Cash collection is accountable per staff member
- Owners see collections, expenses, occupancy and peak hours at a glance, and export Excel / PDF reports without touching a spreadsheet
- Costs nothing to host on Vercel and Supabase free tiers

## Learnings

Building for a real business changed my priorities: the hard parts weren't the screens but the guarantees — making double bookings impossible in the database, keeping private customer data off the public site, and designing a permission model a non-technical owner can manage from their phone.
