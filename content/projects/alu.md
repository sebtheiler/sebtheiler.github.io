+++
title = "Alu Learn"
author = ["Sebastian Theiler"]
date = 2023-05-01
lastmod = 2026-01-07T20:01:27-05:00
draft = false
weight = 13
cover = "/ox-hugo/alulearn.png"
+++

As a sophomore in high school, I founded [Alu Learn](https://alulearn.com), an ed-tech platform designed to help high school students master AP content through spaced repetition.

-   Technologies: React, Next.js, TypeScript, PostgreSQL, Stripe, Tailwind CSS
-   Fall 2021 to Spring 2023

{{< figure src="/ox-hugo/alulearn.png" caption="<span class=\"figure-number\">Figure 1: </span>The landing page of Alu Learn." >}}


## Approach {#approach}

I founded Alu Learn to help high school students efficiently master AP content through personalized, adaptive study tools. I designed and implemented the entire platform, building a React + TailwindCSS frontend for interactive study interfaces and a Next.js + PostgreSQL backend to handle authentication, subscriptions via Stripe, and scalable content delivery.

The platform's core is a flashcard engine with over 100,000 entries. I implemented caching to ensure low-latency retrieval and adapted the SuperMemo SM-2 spaced-repetition algorithm to adjust study schedules dynamically based on each learner's performance. This allowed students to focus on the content they struggled with most while efficiently reinforcing mastery across subjects. I also integrated tools for teachers to manage classes of students and gain insights into their students' understanding of content.


## Results {#results}

Over two years, Alu Learn scaled from a local pilot to over 1,000 students nationwide, generating sustainable revenue through subscriptions. The platform provided a reliable, adaptive study experience that empowered students to excel in AP courses while giving me experience in architecting and deploying full-stack systems.


[//]: # "Exported with love from a post written in Org mode"
[//]: # "- https://github.com/kaushalmodi/ox-hugo"
