---
title: RetrievalHub
summary: Upload any PDF and compare vector RAG against vectorless, tree-based RAG side by side, with token costs on every answer.
year: 2026
order: 7
featured: false
role: Solo — ingestion, retrieval pipelines, frontend
stack: [React, FastAPI, Pinecone, SentenceTransformers, BM25, SSE]
repo: https://github.com/AyushGandhi2004/RetrievalHub
tone: sand
---

## Problem

Retrieval-augmented generation is usually explained in the abstract. Developers rarely get to see how different retrieval strategies behave on the same document, or what each one costs.

## Approach

RetrievalHub is an interactive lab: upload a PDF and ask questions answered by two pipelines side by side.

- **Traditional RAG** — semantic chunking, local SentenceTransformer embeddings in Pinecone namespaces, hybrid search with BM25, Reciprocal Rank Fusion, and cross-encoder re-ranking
- **Vectorless RAG** — layout-aware pagination into a RAPTOR-style bottom-up summary tree, then LLM-guided traversal of that tree to find the answer

## Architecture

A React + Vite frontend handles upload, a document-tree visualization (@xyflow) and a compare layout. The FastAPI backend streams progress and answers over SSE. Every response carries a token badge so the cost of each strategy is visible.

## Results

- The same question, two retrieval philosophies, one screen
- Each step of the pipeline — chunking, fusion, re-ranking, traversal — is visible rather than hidden
- Token cost transparency makes the trade-offs concrete

## Learnings

Building both pipelines made the trade-off clear: vector search is fast and cheap but structure-blind, while tree traversal respects document structure at a higher token cost.
