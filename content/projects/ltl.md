+++
title = "Linear Temporal Logic for Quadruped Exploration"
author = ["Sebastian Theiler"]
date = 2025-05-01
lastmod = 2026-01-07T20:01:38-05:00
draft = false
weight = 6
cover = "/ox-hugo/ltlpipeline.png"
+++

As a research assistant in the Kantaros Autonomous Controls Lab, I implemented autonomous exploration and control algorithms on a Unitree Go2 quadruped. This involved converting natural language ("go to region A while avoiding region B") into linear temporal logic, a formal language for describing conditions over time. The generated linear temporal logic expression could then be converted into a series of waypoints that would fulfill the objectives.

-   Technologies: ROS2, Python, C++, Path Planning and Navigation
-   Fall 2024 to Spring 2025

{{< figure src="/ox-hugo/ltlpipeline.png" caption="<span class=\"figure-number\">Figure 1: </span>Natural Language to Task Execution Pipeline: Natural language is converted into text, which an LLM parses into an LTL formula under human supervision. The formula is then converted into a task to be executed by the Go2." >}}

{{< figure src="/ox-hugo/ltlnav.png" caption="<span class=\"figure-number\">Figure 2: </span>Visualized navigation (RViz) of the Go2 quadruped around an obstacle." >}}


## Approach {#approach}

The project addresses the challenge of enabling non-expert users to specify high-level tasks for a quadruped robot and ensuring the robot executes them correctly. Traditional robotic control interfaces either rely on low-level commands or simple waypoint navigation, which limit accessibility and flexibility. To bridge this gap, we developed a pipeline that translates natural language instructions into Linear Temporal Logic (LTL) formulas, which formally encode sequential and temporal task constraints. These formulas are then used to generate a series of waypoints that guarantee compliance with the user’s intent.

The system is organized into three main components: perception, planning, and control. The Unitree Go2 is equipped with a 2D LIDAR sensor that provides range measurements, which I process into a dynamically updated occupancy grid for mapping and obstacle avoidance. The occupied areas are dilated using `OpenCV` to maintain safety margins around obstacles. Built-in navigation proved unreliable as the robot would often fail to generate a plan for even simple situations. To overcome this, I implemented a custom dynamic A\* planner in ROS that operated directly on the occupancy grid. To follow the A\* waypoints, I used a simple PID controller to rotate the robot toward the goals. Global paths produced by the LTL planner are translated into waypoints that the A\* planner can execute.

For task specification, spoken natural language instructions are transcribed using OpenAI's Whisper API and then converted into LTL using a combination of token-level majority voting and iterative calls to a language model. This produces a valid temporal logic expression that, when combined with the robot's transition system, can be formally verified and used to synthesize a sequence of waypoints satisfying the task. Human supervision can be applied to resolve ambiguity when generating the LTL expression or confirm correctness.


## Results {#results}

The resulting system is a step toward robots capable of executing high-level human intent safely and reliably in complex, partially observed environments. I presented our work at both the undergraduate research symposium and the departmental ESE day and gave some fun demonstrations with the quadruped.

Future work will integrate semantic mapping (SSMI) into the planner, allowing tasks to reference meaningful objects or regions in the environment rather than abstract waypoints. This integration enables the robot to interpret commands like "go to the desk, then the charging station, avoiding obstacles" while maintaining formal guarantees provided by LTL synthesis.


[//]: # "Exported with love from a post written in Org mode"
[//]: # "- https://github.com/kaushalmodi/ox-hugo"
