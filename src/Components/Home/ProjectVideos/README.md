# Project Videos Component

## Overview

The Project Videos Component is a React-based application designed to showcase development project walkthroughs. It provides an intuitive interface for users to view and navigate through various project videos, complete with project details and technologies used.

## Medium Blog Post

[https://medium.com/@erinmontybruce/embracing-ai-in-web-development-a-reflection-on-collaborative-coding-fb9195f4a97f](https://medium.com/@erinmontybruce/embracing-ai-in-web-development-a-reflection-on-collaborative-coding-fb9195f4a97f)

## User Story

As a user interested in development projects:

1. I can view a list of project walkthroughs on a single page.
2. I can select a specific project from a dropdown menu to quickly navigate to it.
3. I can watch video walkthroughs of each project.
4. I can read detailed notes about each project.
5. I can see the technologies used in each project.
6. I can switch between light and dark modes for comfortable viewing in different environments.

## Features

- Responsive design that works on desktop and mobile devices
- Video playback functionality
- Project selection dropdown for easy navigation
- Light/Dark mode toggle
- Detailed project information display

## Technologies Used

- React.js
- CSS3 (with Flexbox and Grid for responsive layout)
- HTML5 (for video playback)

## Usage

After starting the development server, open your browser and navigate to `http://localhost:3000`. You should see the Project Videos Component running.

## Component Structure

The main component is `ProjectVideos`, which renders:

- A mode toggle button
- A title
- A project selector dropdown
- A list of project cards, each containing:
- Project title
- Date
- Video player
- Project notes
- Technologies used

## Customization

To add or modify projects, edit the `projectsData` array in the `ProjectVideos.jsx` file. Each project object should have the following structure:

```javascript
{
id: number,
title: string,
date: string,
videoUrl: string,
notes: string,
techUsed: string[]
}

## Installation

1. Clone the repository:

## Contributing

Contributions to CemeteryRun are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request
```
