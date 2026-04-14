---
title: "Is LLM Tooling the New Way of Interconnecting Systems?"
date: "2026-03-28"
description: "Brief analysis about LLMs Tooling Customization and Contexts using Natural Language."
tags: [tooling, LLM, MCP, agents, NLP]
---

## Introduction

Some days ago exploring the topic of tooling customization and contexts in LLMs, I got genuinely impressed by the rapid evolution in how we can interact with AI Models and the possibilities that this opens up.

## LLM Tooling?

At their core, LLMs like ChatGPT or Gemini started as sophisticated text predictors. However, "tooling" has transformed them into active agents. By providing LLMs with concrete tools, such as the ability to generate images, read documents, or search the web, we bridge the gap between thinking and doing. Letting LLMs execute tasks and interact with the real world.

The power of this tools comes with Model Context Protocol (MCP) powered by Anthropic in 2024. MCPs can be used in a wide variety of models and they are reusable across different platforms, thus it makes them highly valuable and powerful. MCPs can be typically implemented as [docker containers](https://hub.docker.com/mcp). Some examples of MCPs include **Image generation MCP 💻**, **Calendar MCP 📆**, **Web Search MCP 🔍**, or even [**YouTube Transcript MCP 📹**](https://hub.docker.com/mcp/server/youtube_transcript/overview).

Looking more closely at the last example, which is very simple, first thing I noticed is how similar these systems are to traditional REST APIs: they expose tools, much like endpoints in web services, that accept parameters to perform specific tasks (see image bellow).

<div>
    <img
        src="./images/2026/mcps-research/tools-parameters-analogy.png"
        alt="Tools and Parameters Analogy"
    />
</div>

In a way, I think it's like a new evolution of web services that can be executed using natural language. 🤯

## The Remarkable Power of Context

An LLM with the best tools is limited if it doesn't know **what** it is building or **how** you prefer things to be done. It is like giving a chef the best ingredients and kitchen appliances but not telling them what dish you want. Context is the recipe and the steps that guide the LLM in using its tools effectively.

### Enter `AGENTS.md`

Every software engineer is familiar with `README.md` for human onboarding. `AGENTS.md` is the equivalent for AI onboarding (see [webpage](https://agents.md/)). It typically includes technical aspects that should be clear for the LLM, such as:

- **Technology Stack**: What frameworks, libraries, and versions are used.
- **Architecture**: Where things live and how they are organized.
- **Code Conventions**: Strict typing rules, naming conventions...

## Synergy: Tooling + Context

The real magic happens when tooling and context intersect. As AI coding assistants become more autonomous, maintaining a clear and up-to-date `AGENTS.md` file or context isn't just a best practice; it's the foundation of a reliable AI-human relation.
