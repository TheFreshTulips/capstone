# Taskify

## Overview

Taskify is a dashboard-based task management tool which simplifies task tracking and streamlines Weekly Activity Reporting for units and individuals. Depending on their role(s), users can view, filter, create, update, delete, and assign tasks in a one-stop-shop.

## Developers

- Nehemiah Alvarado [@Alvarado98](https://github.com/Alvarado96)
- Claire Badger [@Clairebadger](https://github.com/Clairebadger)
- Darius DeSpain [@darius-despain](https://github.com/darius-despain)
- Lauren Enders [@lenders-game](https://github.com/lenders-game)
- Isaac St. Pierre [@IsaacStPierre](https://github.com/IsaacStPierre)

## Table of Contents

1. [Overview](#overview)
2. [Description](#description)
3. [Future Work](#future-work)
4. [Local Setup and Installation](#local-setup-and-installation)

## Description

Currently, military units rely heavily on email for tracking and dissemination of taskers within their organization. Since email is primarily used for broader communication, taskers are often overlooked and mismanaged as inboxes quickly become cluttered.

By contrast, Taskify is a centralized location for task management where all members of a unit can create, complete, or collaborate on taskers. Users can have different roles and permissions (Admin, Supervisor, or Member). Members have basic permissions: they can view and create personal tasks, view all tasks within their unit, and complete tasks assigned to them. Supervisors are akin to military supervisors: they can create and assign tasks, as well as view all tasks within their unit and any sub-units. They also retain all the permissions of a normal member. Admins can create and modify roles and organizations in Taskify. Completed tasks are archived and can be referred back to. Each task has its own comment section where all members of a unit can communicate and ask questions pertaining to the specific task.

Aside from task tracking, the second key feature of Taskify is weekly activity tracking. Weekly Activity Reports (WARs) are commonly used for oversight in military units, but the process of writing and reviewing them can be tedious and a time-sink. The same goes for writing awards packages and performance reports. Taskify streamlines that process by enabling supervisors to quickly see what their people are up to, and allowing servicemembers to easily refer back to their accomplishments when gathering bullets for EPRs/OPRs and awards. When a user completes a task, that task gets pushed to their Weekly Activity Reports page. Supervisors can view WARs for all members of their unit as well as their own WAR. WAR pages are updated weekly and then older tasks can be referenced in the Archive.

## Future Work

There are number of additional features that could be added to future versions of Taskify:

- feature 1?

## Local Setup and Installation

Fork and clone with github [repo](https://github.com/TheFreshTulips/capstone) \
Ensure you have Docker and Docker compose installed. See below for more dependencies. \
In the api directory: `npm i`\
In the ui directory: `npm i`\
In the root directory: `docker compose up --build -d`

### Dependencies:

UI:

- React
- react-router-dom

API:

- Express
- Knex
- Bcrypt (for authentication)
- CORS
- pg
- Nodemon

Database:

- PostgreSQL
