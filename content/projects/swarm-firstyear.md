+++
title = "Swarm Robotics"
author = ["Sebastian Theiler"]
date = 2024-05-01
lastmod = 2026-01-07T19:59:53-05:00
draft = false
weight = 9
+++

An earlier stage of the modular Swarm project (before I was captain) focused more heavily on distributed communication through mesh networks and localization through VSLAM.

-   Technologies: ROS2, C++, Python, OpenCV, ORB-SLAM3, XBee, Raspberry Pi
-   Fall 2023 to Spring 2024


## Approach {#approach}

As a software lead on the early stages of the WashU Robotics Swarm Project, I focused on distributed localization and communication. The goal was to enable each robot to maintain awareness of the Swarm and its environment using decentralized techniques.

In support of this, I developed an addition to ORB-SLAM3 to support shared map localization, allowing each robot to contribute to a unified world model. This system was designed to allow the swarm to share map data to gather information about the environment more quickly. In theory, the robots would then share this information over a decentralized mesh network using XBee radios. However, when experimenting outside of simulation with monocular Raspberry Pi cameras, the robots would often accumulate considerable drift even with loop-closure and running ORB-SLAM3 on the constrained hardware led to a low frame rate. This was incredibly difficult to overcome without switching to a stereo or depth camera, but the desired low-cost of each individual Swarm robot could not be maintained if we switched to these more expensive cameras.


## Results {#results}

The team and I presented our work at the spring Robot Day, hosted by WashU Robotics; however, our most effective work remained in simulation. These lessons learned about VSLAM informed the later evolution of the project, guiding a switch to overhead cameras and UWB localization when I became team captain and shifted the project toward modular self-assembly and more resilient multi-agent algorithms. While the work on VSLAM was incredibly interesting and valuable to me, in retrospect I believe that our focus on it prevented us from progressing further in other, more important aspects of Swarm robotics.


[//]: # "Exported with love from a post written in Org mode"
[//]: # "- https://github.com/kaushalmodi/ox-hugo"
