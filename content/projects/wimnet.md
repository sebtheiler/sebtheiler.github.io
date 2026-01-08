+++
title = "WiMNet"
author = ["Sebastian Theiler"]
date = 2025-08-29
lastmod = 2026-01-07T19:59:20-05:00
draft = false
weight = 5
cover = "/ox-hugo/indigo.png"
+++

At Columbia University's [Wireless &amp; Mobile Networking (WiMNet) Lab](https://wimnet.ee.columbia.edu/), I researched resilient Open RAN (O-RAN) 5G architectures to enhance communication reliability for emergency and public safety networks under disaster conditions. This research is part of an effort to integrate AI-driven control into mobile infrastructure.

-   Technologies: O-RAN, Go, Python, Linux, Git, 5G Networking
-   Summer 2025

{{< figure src="/ox-hugo/indigo.png" caption="<span class=\"figure-number\">Figure 1: </span>A screenshot of the INDIGO Mission User Interface, displaying several radio units providing coverage to an area. Gray areas are degraded, but an operator can draw a virtual slice to restore coverage by pooling resources from other operators." >}}


## Approach {#approach}

As a research intern, I contributed to INDIGO, a 5G testbed designed to guarantee reliable communications for first responders during disaster scenarios. INDIGO uses a hierarchical-task network (HTN) AI planner to translate mission requirements (e.g., required bandwidth within a geographic region) into deployable network configurations for O-RAN operators.

My work focused on enhancing the interactivity and integration of the INDIGO mission user interface with the AI Planner. I designed and implemented some of INDIGO's core user-facing components, such as the Plan Visualizer, which provided a more refined and intuitive tool for displaying the AI Planner's generated plans. Previously, the MUI would simply display a raw Lisp-like expression that was difficult for humans to interpret. The Plan Visualizer converted this into clear blocks that explained the steps of the plan, making it easier for a human operator to interpret and validate the output. I also designed several experiments to evaluate the effectiveness of the INDIGO user interface and overall response time.


## Results {#results}

This work culminated in my first academic publication: I co-authored [a paper](https://scholar.google.com/scholar?oi=bibs&cluster=4148381964547874713&hl=en) accepted to [IEEE World Forum on Public Safety Technology (WFPST) 2025](https://ieee-wfpst.org/program/technical-papers-program/), describing INDIGO's design, its performance under simulated emergency scenarios, and proposed extensions for multi-operator coordination.


[//]: # "Exported with love from a post written in Org mode"
[//]: # "- https://github.com/kaushalmodi/ox-hugo"
