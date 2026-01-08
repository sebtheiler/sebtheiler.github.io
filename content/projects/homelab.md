+++
title = "Homelab"
author = ["Sebastian Theiler"]
date = 2025-09-29
lastmod = 2026-01-07T20:00:24-05:00
draft = false
weight = 7
+++

To get a better understanding of networking, virtualization, and system administration, I created a homelab environment. This began as a personal Linux server on local hardware but has since expanded to include a shared system supporting the WashU Robotics Club.

-   Technologies: Proxmox, Linux, virtualization, networking, system administration, NixOS/Nix, Tailscale
-   Spring 2025 to Present


## Approach {#approach}

My homelab started as a Proxmox VE hypervisor, hosting a variety of services for storing documents, hosting photos, and playing media for my family and me. This was built mostly from recycled components, such as the motherboard from a defunct laptop, 3D printed parts, and a desktop cooling unit I found on the street. It consists of an 8-port switch, a mini router, several Raspberry Pis (one of which is connected to an FPGA allowing me to experiment with it remotely), and two refurbished server HDDs. After migrating to a dedicated mini-PC, I transitioned from Proxmox to NixOS; this gives me declarative control over configuration and ensures complete reproducibility across environments for future expansions or upgrades. Nix is a purely functional programming language for package management that enables reproducible environments across hardware and virtual instances. I use NixOS on my personal laptop and desktop to ensure a consistent environment that combines bleeding-edge features with atomic rollbacks if an update ever breaks something.

Recognizing that the robotics club's powerful but underutilized PC could serve multiple teams, I reconfigured it into a shared virtualization host using Proxmox. This architecture enables multiple projects to access isolated development environments simultaneously, reducing idle hardware time and improving collaboration. A lightweight user-management and scheduling system, handled through a Discord bot, ensures fair resource allocation among teams. Containers provide lightweight, always-on environments for rapid experimentation (especially for ROS2 users on non-Linux systems), while full VMs offer GPU-accelerated instances for simulation and AI workloads using Gazebo, RViz, and IsaacSim.


## Results {#results}

I use my personal homelab every day for trivial tasks such as tag-based bookmarking as well as more sophisticated archiving of my own documents, photos, and important public-domain and historical documents. It gives me a clean place to experiment with software development and deployment from anywhere, even from my phone, and is responsible for syncing files and other information between my devices.

Several robotics projects use the robotics server, accelerating their progress by allowing them to experiment remotely and leave simulations running while away. The Discord-based interface for reserving GPU access is intuitive and ensures fair access across projects.


[//]: # "Exported with love from a post written in Org mode"
[//]: # "- https://github.com/kaushalmodi/ox-hugo"
