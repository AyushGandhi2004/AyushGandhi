---
title: Sentinel
summary: A drone security analyst that watches patrol footage with a vision model, fires rule-based alerts and lets you query the whole patrol in plain English.
year: 2026
order: 4
featured: true
role: Solo — built for the FlytBase AI Engineer assignment
stack: [Groq VLM, LangChain, ChromaDB, OpenCV, Streamlit, Python]
live: https://sentinel-svf6.onrender.com
repo: https://github.com/AyushGandhi2004/Sentinel
tone: sage
---

## Problem

A docked drone can patrol a property every day, but someone still has to watch hours of footage. Property owners need real-time alerts, a searchable history, and a plain-English summary of each sweep — without a human in the loop.

## Approach

Sentinel turns a patrol drone into an autonomous security analyst. It samples a frame every N seconds, enriches it with telemetry and a property zone, and asks a vision-language model for a structured analysis: objects, risk level and recommended action — grounded in the previous frames, not just the current one.

- **Deterministic alerting** — operators define rules in YAML (perimeter breach, night activity, loitering, unknown vehicles) with zero code changes
- **Frame-by-frame memory** — every analyzed frame is indexed in ChromaDB, so the patrol can be replayed and questioned later
- **Natural-language Q&A** — "Was there a vehicle near the gate after 10pm?"

## Architecture

OpenCV feeds frames into a data pipeline that assigns zones and telemetry. A stateful SecurityAgent (Groq, llama-3.2-90b-vision) keeps a rolling window of recent events. Its output fans out through LangChain's `RunnableParallel` to the event logger, alert engine and frame indexer at once, so slow side effects never block analysis. A five-tab Streamlit dashboard surfaces everything live.

- Pluggable interfaces for frame source, AI provider and storage — swapping video for a live RTSP stream, or Groq for another provider, is a one-line change
- Zones and alert rules live in YAML so non-developers can tune the system

## Results

- Real-time, context-aware scene analysis on each sampled frame
- Rule-based alerts that are explainable and predictable, alongside the model's judgment
- A fully queryable patrol log after every sweep

## Learnings

Pairing an LLM with deterministic rules gave the best of both: the model handles open-ended understanding, while the rules guarantee the alerts operators actually depend on.
