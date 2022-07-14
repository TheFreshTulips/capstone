# Taskify

## Overview

Taskify is a dashboard-based task management tool which simplifies task tracking and streamlines Weekly Activity Reporting for units and individuals. Depending on their role(s), users can view, filter, create, update, delete, and assign tasks in a one-stop-shop.

This app is deployed to Heroku on two separate applications, one for the [UI/front-end](https://taskify-capstone-ui.herokuapp.com/) and one for the [API/back-end](https://taskify-capstone-api.herokuapp.com/).

*Be aware that if the application is currently spun down because it's been idle for some time, then it will likely take some time to spin back up. If it doesn't come up the first time you may have to refresh the page.*

## Developers

- Nehemiah Alvarado [@Alvarado96](https://github.com/Alvarado96)
- Claire Badger [@Clairebadger](https://github.com/Clairebadger)
- Darius DeSpain [@darius-despain](https://github.com/darius-despain)
- Lauren Enders [@lenders-game](https://github.com/lenders-game)
- Isaac St. Pierre [@IsaacStPierre](https://github.com/IsaacStPierre)

## Table of Contents

1. [Overview](#overview)
1. [Description](#description)
    1. [ERD](#erd)
1. [About Our UI](#about-our-ui)
    1. [Dashboard](#dashboard)
    1. [Unit Tasks](#unit-tasks)
    1. [Reports](#reports)
    1. [Archive](#archive)
    1. [Profile](#profile)
    1. [Admin Functions](#admin-functions)
        1. [View/Modify Roles](#view-modify-roles)
        1. [View/Modify Organizations](#view-modify-organizations)
1. [About our API](#about-our-api)
    1. [Tasks Endpoints](#tasks-endpoints)
    1. [User Endpoints](#user-endpoints)
    1. [Orgs Endpoints](#orgs-endpoints)
1. [Future Work](#future-work)
1. [Local Setup and Installation](#local-setup-and-installation)

## Description

Currently, military units rely heavily on email for tracking and dissemination of taskers within their organization. Since email is primarily used for broader communication, taskers are often overlooked and mismanaged as inboxes quickly become cluttered.By contrast, Taskify is a centralized location for task management where  members of a unit can create, complete, or collaborate on taskers. Users can have different roles and associated permissions.

Aside from task tracking, the second key feature of Taskify is weekly activity tracking. Weekly Activity Reports (WARs) are commonly used for oversight in military units, but the process of writing and reviewing them can be tedious and a time-sink. The same goes for writing awards packages and performance reports. Taskify streamlines that process by enabling supervisors to quickly see what their people are up to, and allowing servicemembers to easily refer back to their accomplishments when gathering bullets for EPRs/OPRs and awards.

### Features

#### Front-End
1. Login & Registration: Upon visiting Taskify, a user views the Login page where they can enter their credentials. If they do not have an account, they can click a link which navigates to the Registration page. Once registered, a Taskify admin must add a role to the new user; either Member, Supervisor, or Admin. Members have basic permissions: they can view and create personal tasks, view all tasks within their unit, and complete tasks assigned to them.  Completed tasks are archived and can be referred back to. Each task has its own comment section where all members of a unit can communicate and ask questions pertaining to the specific task. When a user completes a task, that task gets pushed to their Weekly Activity Reports page. Supervisors are akin to military supervisors: they can create and assign tasks to members they supervise, as well as view all tasks within their unit and sub-unit. They can view WARs for all members of their unit as well as their own WAR. They also retain all the permissions of a normal member. Admins can create and modify roles and organizations in Taskify.

2. User Dashboard: After logging in, a user can see everything of immediate interest to them. Similar to a Kanban board, the Dashboard contains columns which house Task Cards. A normal member sees two columns: To Do and In Progress.

### ERD

![alt text](https://i.ibb.co/8cStPK9/Image-Pasted-at-2022-7-6-15-39.png "ERD")

## About Our UI

### Dashboard
This page is designed to be your view of everything that you might need to pay attention to. See the [Unit Tasks](#unit-tasks) page for tasks that are assigned to your organization as a whole.

Every user's dashboard has three columns, **To Do**, **In Progress** and **Created By Me**.
- **To Do** contains tasks that are assigned to you and have a status of **To Do**, indicating that they haven't been started yet.
- **In Progress** contains tasks that are assigned to you and have a status of **In Progress**, indicating that they have been started, but are not completed yet.
- **Created By Me** contains tasks that are created by you, even if those tasks are not assigned to you or your organization.

#### Screencapture of Dashboard

### Unit Tasks
This page is designed to be your view of all tasks in your immediate organization, unless you are a supervisor, in which case you can see tasks in organizations directly beneath yours in addition to your own.

This page contains two columns, **To Do** and **In Progress**.
- **To Do** contains tasks that are assigned to your organization and have a status of **To Do**, indicating that they haven't been started yet.
- **In Progress** contains tasks that are assigned to your organization and have a status of **In Progress**, indicating that they have been started, but are not completed yet.

#### Screencapture of Unit Tasks (member view)
#### Screencapture of Unit Tasks (supervisor view)

### Reports
The reports page contains tasks that are completed or newly created within the past week. It is designed to aid in the creation of Weekly Action Reports (WARs) that most offices have to generate weekly.

The page is defaulted to viewing the report for your entire organization, but it can also be switched to a personal view to show only tasks that were assigned to you.

It displays four columns, **Title**, **Description**, **Assigned To**, and **Date Completed**.
- **Title** displays the title of the task
- **Description** displays the first 100 characters of the description
- **Assigned to** displays a list of all users assigned to that task
- **Date Completed** displays the date the task was completed or "In Progress" if the task is not yet completed.

#### Screencapture of Reports

### Archive
#### Screencapture of Archive

### Profile
#### Screencapture of Profile

### Admin Functions
#### Screencapture of Admin Menu

#### View/Modify Roles
##### Screencapture of View/Modify Roles

#### View/Modify Organizations
##### Screencapture of View/Modify Organizations


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
