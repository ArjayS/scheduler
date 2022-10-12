# Interview Scheduler

## Description

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

## Setup

Install dependencies with `npm install`.

## Scheduler-API Repo

- Please see the link for the [Scheduler-API Repo provided by Lighthouse](https://github.com/lighthouse-labs/scheduler-api)
- Please see the link for the [My Scheduler-API Repo cloned from Lighthouse](https://github.com/ArjayS/scheduler-api)

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Interview Scheduler Image Layout & GIF Functionality

### Interview Scheduler Layout

![Interview Scheduler Layout](https://github.com/ArjayS/scheduler/blob/master/image/InterviewSchedulerLayout.JPG)

### Booking an Interview

![GIF demonstration of Booking an Interview](https://github.com/ArjayS/scheduler/blob/master/image/InterviewSchedulerBookingAnInterviewGIF.gif)

_Gif demonstration of booking an appointment / interview_

### Editing an Interview

![GIF demonstration of Editing an Interview](https://github.com/ArjayS/scheduler/blob/master/image/InterviewSchedulerEditingAnInterviewGIF.gif)

_Gif demonstration of editing an appointment / interview. Also, running one of the integration error testing when save is clicked first and then properly booking an interview_

### Deleting an Interview

![GIF demonstration of Deleting an Interview](https://github.com/ArjayS/scheduler/blob/master/image/InterviewSchedulerDeletingAnInterviewGIF.gif)

_Gif demonstration of deleting an appointment / interview_
