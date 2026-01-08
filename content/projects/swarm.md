+++
title = "Modular Swarm Robotics"
author = ["Sebastian Theiler"]
date = 2026-01-07
lastmod = 2026-01-07T20:02:36-05:00
tags = ["robotics", "planning", "control", "modular-robotics"]
draft = false
weight = 1
cover = "/ox-hugo/swarm1.png"
+++

As captain of the [WashU Robotics](https://washurobotics.com/) [Swarm Team](https://washurobotics.com/Projects/swarm), I lead the development of modular, self-assembling robots capable of forming collective structures. The goal is to study emergent behavior, distributed control, and self-replication in multi-agent systems. My work on Swarm is done under the supervision of Yiannis Kantaros, whom I am working with to develop planning and control algorithms for the project.

-   Technologies: ROS2, C++, Python, OpenCV, Raspberry Pi, XBee, KiCAD, 3D Printing
-   Fall 2024 to Present

{{< figure src="/ox-hugo/swarm1.png" caption="<span class=\"figure-number\">Figure 1: </span>Several Swarm modules connected to form a larger structure" >}}


## Approach {#approach}

Swarm is a collaborative project that depends on coordination across software, electrical, and mechanical subteams. As such, my role as captain has two primary parts: (1) organizing the contributions of the other team members on Swarm and (2) developing the navigation, control, and planning algorithms for the Swarm and the supporting software architecture.


### Organization {#organization}

Swarm is organized into electrical, mechanical, and software subteams, each with 5-7 members. These teams meet individually once per week and together on Saturdays. I attend almost all of the individual meetings in addition to the group meeting, and, while I'm usually working on something not directly related to the subteam's focus, I absorb as much context as possible so I can provide necessary guidance.

I have learned that being an effective leader is less about the volume of words spoken and more about saying the right thing at the right time. This has included major design decisions, such as transitioning from electropermanent magnets, whose sensitivity made them impractical, to a universal modular connector architecture that can support more weight and is able to connect with both other Swarm modules and arbitrary "tools." On the other hand, it includes interpersonal elements, such as discussions with individuals about the future of the project and ensuring subteams are actively considering the requirements of other subteams as they work.


### Sampling-Based Planning {#sampling-based-planning}

The most exciting part of Swarm for me is developing planning algorithms for reconfiguring modular robots. This field is largely unexplored, and I am working with Professor Kantaros to adapt planning algorithms developed for autonomous manipulation of a robot's environment to modular robotics.

My approach inverts the problem of traditional robotic planning: instead of a fixed robot navigating a changeable environment, I model it as a transformable robot navigating a fixed environment. Feasible configurations of the modular robots within the environment are represented as nodes in a graph (some nodes are _accepting states_ or "goals") and edges between nodes represent a single-step manipulation to transform from one state into the next. Planning therefore becomes a problem of searching this graph for a series of actions that leads to an accepting state.

A naive search of this graph would be computationally intractable, so I use an LLM to focus search in particular directions. LLMs are capable of understanding the environment and suggesting actions that are more likely to lead to the goal state. Further, because the graph search is still limited to valid actions (edges) between states, the LLM can't generate invalid transitions, preventing it from hallucinating a physically impossible plan.

To assist in searching for reconfigurations of the modular robots when faced with an obstacle, I developed a constraint programming domain-specific language, roughly inspired by Prolog, that gives constraints on the shapes of a modular structure. For example, it must have a certain length to cross a gap. An LLM can look at a representation of the obstacle and generate a constraint in this language. I then use Monte Carlo Tree Search to search for a valid topology that meets this constraint.

On a lower level, the robots need to actually move between edges in this graph. I handle this through an implementation of distributed A\* for cooperative path planning, combined with an _unwrapping_ algorithm I designed that converts a target modular topology into a flattened assembly plan. For localization, I developed an extended Kalman filter integrating measurements from an overhead camera and control inputs from each agent's navigation module.


## Results {#results}

Last spring, we demonstrated the ability of our modular Swarm robots to form structures that were capable of completing more tasks than any individual robot could achieve, such as crossing small bridges. We also demonstrated the ability of several robots to achieve simple navigation simultaneously while avoiding collisions.

Swarm is still under heavy development, and I hope to publish our accomplishments. The first publication will focus on our hardware, which we will open source, and will focus on the ability of our Swarm to use tools. After this, I will focus on follow-up papers regarding planning, navigation, and control with modular robots, using our hardware platform as a base.


[//]: # "Exported with love from a post written in Org mode"
[//]: # "- https://github.com/kaushalmodi/ox-hugo"
