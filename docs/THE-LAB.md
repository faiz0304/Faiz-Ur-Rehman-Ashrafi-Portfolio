# THE LAB — Faiz Ur Rehman Ashrafi

> *Production-grade agent architectures, RAG pipelines, and multi-agent orchestration systems — each built to perceive, reason, and act autonomously.*

---

## Featured Systems

### 🚀 SnapReply AI
**Autonomous Customer Support Agent for Local E-Commerce**

An autonomous customer support agent designed for local e-commerce businesses. SnapReply seamlessly manages multi-channel inquiries across WhatsApp and Instagram, handling product questions, order tracking, and complaint resolution through natural dialogue — all orchestrated by a stateful LangGraph cognitive pipeline with custom webhook integrations for real-time message routing.

| Attribute | Detail |
|-----------|--------|
| **Category** | Autonomous Workflows |
| **Status** | ✅ Deployed |
| **Stack** | LangGraph, FastAPI, Custom Webhooks, Groq LLM, WhatsApp API, Instagram API |

**Architecture Highlights:**
- Stateful conversation graph with branching logic
- Multi-channel webhook router (WhatsApp + Instagram)
- Real-time intent classification & escalation
- Persistent memory across customer sessions

**Metrics:**

| Channels | Avg Response | Uptime |
|----------|-------------|--------|
| 2 | < 2s | 99.9% |

---

### 🧠 SAI (Shabnam-AI) Command Center
**Autonomous Digital Organization with AI Employees**

The command center for an autonomous digital organization. SAI choreographs tasks across a fleet of specialized AI employees — from sales agents and content writers to research analysts — through a central dashboard that monitors agent health, assigns workflows, and visualizes the entire operational pipeline of a startup run by digital workers.

| Attribute | Detail |
|-----------|--------|
| **Category** | Multi-Agent Orchestration |
| **Status** | ✅ Deployed |
| **Live MVP** | [sai-cc-mvp.lovable.app](https://sai-cc-mvp.lovable.app/) |
| **Stack** | AgentScope, Next.js, Multi-Agent Orchestration, WebSocket, Tailwind CSS, LangGraph |

**Architecture Highlights:**
- Central orchestrator dispatching to agent swarms
- Real-time agent health monitoring dashboard
- Dynamic task queue with priority scheduling
- Role-based AI employee specialization

**Metrics:**

| AI Employees | Tasks/Day | Latency |
|-------------|-----------|---------|
| 6 | 240+ | < 500ms |

---

## Standard Projects

### 🔗 Multi-Agent E-Commerce
**Coordinated Agent Swarm**

An orchestrated multi-agent system where specialized nodes handle product search, inventory checks, order processing, and customer support — communicating through a shared state graph.

| Attribute | Detail |
|-----------|--------|
| **Category** | Multi-Agent Orchestration |
| **Status** | ✅ Deployed |
| **Stack** | CrewAI, LangChain, FAISS, HuggingFace, PostgreSQL |

---

### 🔍 Subdomain RAG Engine
**Context-Grounded Retrieval**

A modular retrieval-augmented generation pipeline using local embeddings (MiniLM) and FAISS vector search, designed as a reusable LangGraph sub-agent for domain-specific knowledge grounding.

| Attribute | Detail |
|-----------|--------|
| **Category** | RAG Architecture |
| **Status** | ✅ Deployed |
| **Stack** | LangGraph, FAISS, Sentence-Transformers, FastAPI |

---

### 📊 GitHub Strategy Analyzer
**Two-Pass AI Codebase Auditor**

A SaaS MVP that ingests public GitHub repos through a Scout → Deep Thinker two-pass AI architecture, extracting architectural strategies and rendering them as interactive node graphs.

| Attribute | Detail |
|-----------|--------|
| **Category** | AI-Powered SaaS |
| **Status** | 🔄 In Progress |
| **Stack** | Next.js, Gemini API, React Flow, Tailwind CSS |

---

### 🧩 Cognitive Pipeline Framework
**Modular Agent Assembly**

A framework for composing agentic pipelines from interchangeable cognitive modules — perception, reasoning, memory, and action — enabling rapid prototyping of autonomous systems.

| Attribute | Detail |
|-----------|--------|
| **Category** | Multi-Agent Orchestration |
| **Status** | 🔬 Research |
| **Stack** | Python, LangGraph, Redis, Docker, gRPC |

---

### 🍕 Pizza Pronto
**Autonomous E-Commerce / Delivery Prototype**

A conceptual e-commerce and delivery prototype built to demonstrate autonomous order routing, real-time tracking, and automated customer interaction inside a food delivery context.

| Attribute | Detail |
|-----------|--------|
| **Category** | E-Commerce |
| **Status** | ✅ Deployed |
| **Live Demo** | [dough-delivery-co.lovable.app](https://dough-delivery-co.lovable.app/) |
| **Stack** | Next.js, AI Agents, Tailwind CSS |

---

## OpenClaw — Autonomous Linux Agent
*(From Resume Projects)*

A fully autonomous terminal-based agent built on LangGraph and Claude 3.5 Sonnet that understands natural-language instructions and executes multi-step Linux system tasks without human hand-holding. Implements a ReAct reasoning loop, tool-use scaffolding, and safe command sandboxing.

| Attribute | Detail |
|-----------|--------|
| **GitHub** | [github.com/faiz0304/openclaw](https://github.com/faiz0304/openclaw) |
| **Stack** | Python, LangGraph, Claude 3.5 Sonnet, Linux |
| **Pattern** | ReAct reasoning loop |

---

## Portfolio — This Site
**Agentic AI Developer Showcase**

A performance-optimised, dark-themed portfolio built with Next.js 15 App Router, Framer Motion animations, and an integrated ATS Resume Optimizer powered by a Groq-hosted LLaMA model. Deployed on Vercel with perfect Lighthouse scores.

| Attribute | Detail |
|-----------|--------|
| **GitHub** | [github.com/faiz0304/portfolio](https://github.com/faiz0304/portfolio) |
| **Stack** | Next.js, TypeScript, Framer Motion, Tailwind CSS, Groq |

---

## Architecture Patterns I Work With

```
Perception Layer      →  Data ingestion, webhook routing, embedding
Reasoning Layer       →  ReAct loops, chain-of-thought, tool selection
Memory Layer          →  Vector stores (FAISS/Chroma), session persistence
Action Layer          →  API calls, terminal commands, message dispatch
Orchestration Layer   →  LangGraph state machines, CrewAI crew routing
```

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ Deployed | Live in production |
| 🔄 In Progress | Actively under development |
| 🔬 Research | Experimental / prototyping phase |
