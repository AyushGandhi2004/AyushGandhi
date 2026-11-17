---
title: Expense Tracker
summary: A mobile-first PWA for expenses, recurring payments, SIPs and stock and mutual-fund holdings, with offline quick-add.
year: 2026
order: 1
featured: true
role: Solo — product, design, full stack
stack: [Next.js 16, TypeScript, Supabase, Postgres, Drizzle ORM, Tailwind, shadcn/ui]
live: https://expense-tracker-gamma-ebon-38.vercel.app
repo: https://github.com/AyushGandhi2004/ExpenseTracker
tone: sage
---

## Problem

Spending apps either stop at "log an expense" or try to be a bank. I wanted one place, on my phone, that tracks day-to-day spending, the payments that repeat on their own schedule, and my investments — and stays fast even with no signal.

## Approach

A personal, installable PWA built in phases, each adding a layer of my real finances.

- **Quick add, even offline** — entries get a client-side UUID and go to a local queue first, then sync; creates are idempotent on that id, so a flaky network never duplicates an expense
- **Accounts and payment methods** — balances, add money, transfers between accounts, and "set actual balance" to reconcile with the bank
- **Transactions** — search and filters, swipe to edit or delete, with undo
- **Dashboard and budgets** — weekly and monthly spending, plus monthly limits overall or per category that warn from 80%
- **Recurring payments** — insurance every year, Wi-Fi every 3 months, salary on the last day of the month, recorded automatically on their due dates
- **SIPs** — each instalment debits the account and buys units at that day's NAV
- **Investments** — mutual funds and NSE / BSE stocks: buy and sell, holdings, current value and profit / loss with automatic prices
- **Data you own** — CSV export, a REST API for scripts or a future mobile app, and weekly encrypted backups

## Architecture

Next.js 16 (App Router, TypeScript) on Vercel, with Supabase Postgres in Mumbai and Drizzle ORM. Business logic lives in a services layer shared by the web app's server actions and the `/api/v1` endpoints, so both behave identically.

- **Money is integer paise, never floats**; unit counts and prices are exact scaled decimals
- **Balances are derived** from a single transactions ledger rather than stored, so they can't drift
- **Investing is not spending** — a buy creates an `invest` ledger row in the same database transaction as the trade, so spending analytics stay honest while balances stay correct
- **Schedules don't drift** — dates are computed from the first payment, so month-end runs go 31 Jan → 28 Feb → 31 Mar
- **Idempotent automation** — due payments are recorded when the app opens and by a daily cron; a unique index on schedule + date makes a duplicate impossible
- **Live prices** — fund NAVs from AMFI's daily file, share prices from Yahoo Finance, refreshed on demand (rate-limited per holding) and nightly, with the last price kept if a source is down
- **Row Level Security** on every table, email-code sign-in for a single allowlisted user

| Layer | Technology |
|---|---|
| App | Next.js 16, React, TypeScript, Tailwind CSS, shadcn/ui |
| Data | Supabase Postgres (Mumbai), Drizzle ORM and migrations, RLS |
| Auth | Supabase email OTP, allowlisted user |
| Offline | Installable PWA, service worker, local quick-add queue |
| Automation | Vercel Cron (daily schedules and price refresh), GitHub Actions encrypted backups |
| Quality | Vitest unit tests, typecheck and lint |

## Results

- Live and installable on my phone; opens offline and syncs when back online
- Spending, recurring bills, income, SIPs and investments in one ledger that always reconciles
- Correct to the paisa: no floating-point money anywhere

## Learnings

Treating every number as a ledger entry — and deriving everything else from it — made features like investments, transfers and reconciliation fall into place instead of becoming special cases. Idempotency at the database level was what made offline entry and automated schedules safe.
