---
title: ACMP
summary: Six AI agents that modernize legacy code end to end, then prove it still works in a Docker sandbox.
year: 2026
order: 2
featured: true
role: Solo — design, backend, agents, frontend
stack: [LangGraph, FastAPI, Groq, ChromaDB, Docker, React, WebSockets]
repo: https://github.com/AyushGandhi2004/ACMP
tone: sand
---

## Problem

Legacy code is expensive to keep alive and risky to rewrite. Teams avoid modernizing because a rewrite can silently change business logic, and manual migration (say, Python 2.7 / Django 1.x to Python 3.12) is slow and error-prone.

## Approach

ACMP is an **Autonomous Code Modernization Platform**: paste legacy code and a pipeline of six specialized agents analyzes, plans, rewrites, tests and fixes it — preserving the original behavior and validating it in a real sandbox.

- **Profiler** detects the language, framework and version
- **Anchor** generates unit tests from the original code, so behavior is pinned before anything changes
- **Architect** queries a RAG store of migration docs and builds a transformation plan
- **Engineer** rewrites the code following that plan
- **Tester** runs the tests in an isolated Docker container per run
- **Fixer** repairs failures and loops back until the tests pass

## Architecture

The React frontend posts code to FastAPI, which returns a session id immediately and runs the LangGraph state machine as a background task. Every agent step streams over a WebSocket, so the UI shows live agent activity and finishes with a side-by-side diff and test results.

| Layer | Technology |
|---|---|
| Orchestration | LangGraph state machine with conditional routing |
| LLM | Groq · llama-3.3-70b-versatile |
| Retrieval | ChromaDB + all-MiniLM-L6-v2 (local embeddings) |
| Sandbox | Docker SDK, one container per run |
| API | FastAPI, async, background tasks |
| Realtime | WebSockets |
| Frontend | React, Vite, Tailwind, Zustand |

## Results

- Converts legacy Python 2.7 / Django 1.x code into modern Python 3.12 with passing tests
- Behavior is anchored by generated tests **before** the rewrite, not checked after the fact
- Self-healing loop: failures go back to the Fixer instead of reaching the user
- Runs on free-tier LLMs and local embeddings, so it costs almost nothing to operate

## Learnings

Pinning behavior with tests first turned a "trust the LLM" problem into a verifiable one. Modeling the pipeline as an explicit state machine made retries, routing and streaming far easier to reason about than a free-form agent loop.
