---
title: Restaurant Delivery
summary: Food ordering with live rider tracking, real-time order status, payments, and separate customer, admin and rider apps.
year: 2026
order: 6
featured: false
role: Solo — full stack
stack: [React, Node.js, Express, MongoDB, Redis, Socket.io, Razorpay]
live: https://restaurant-delivery-xi.vercel.app
repo: https://github.com/AyushGandhi2004/RestaurantDelivery
tone: sage
---

## Problem

Food ordering looks simple until you need three different users — customers, restaurant admins and delivery riders — seeing the same order change state in real time.

## Approach

One system, three experiences:

- **Customer app** — browse the menu, manage a cart, pay with Razorpay, track order status live and follow the rider on a map, then leave a review
- **Admin console** — manage categories and menu items with Cloudinary image uploads, shop hours and banners, and move orders through paid → preparing → ready → out for delivery → delivered
- **Rider panel** — share live GPS location for active deliveries

## Architecture

A React 19 + Vite client talks to an Express API on MongoDB. Socket.io rooms push order updates and rider locations to exactly the right customers. Redis caches frequently-read menu and shop data. Role-based middleware protects admin and rider routes.

- JWT auth with role checks per route
- Rate limiting on general and auth endpoints, Helmet and CORS controls
- Global error handling and a health endpoint

## Results

- Real-time order status and live rider location on a Leaflet map
- End-to-end payment flow in Razorpay test mode
- Production-style hardening: caching, rate limits, validation and role separation

## Learnings

Designing socket rooms around orders rather than users kept real-time updates targeted and simple, and caching the read-heavy menu in Redis took most of the load off MongoDB.
