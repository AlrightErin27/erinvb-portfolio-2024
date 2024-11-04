# Erin's Dev Blog

A sleek, cyberpunk-themed personal blog built with React.js, featuring a Medium RSS feed integration.

[Medium Blog](https://medium.com/@erinmontybruce)

[Medium Entry: Nostromo Computer Diary: Log Entry #042, Officer Ripley Reporting](https://medium.com/@erinmontybruce/nostromo-computer-diary-log-entry-042-officer-ripley-reporting-a30c8032d3c2)

[Medium Entry: Axios](https://medium.com/@erinmontybruce/axios-48f3c8d7252b)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)

## Features

- Cyberpunk-inspired design with neon colors and glitch effects
- Responsive layout for various screen sizes
- Medium RSS feed integration
- Loading and error states
- Animated starfield background
- Scanning line effect

## API Integration

This project integrates with Medium's RSS feed using the RSS2JSON API to fetch and display blog posts. We use Axios, a popular HTTP client for JavaScript, to make the API requests.

### Fetching Data from Medium

We use the following function to fetch blog posts:

```javascript
import axios from "axios";

const getPostData = async () => {
  try {
    setLoading(true);
    const response = await axios.get("https://api.rss2json.com/v1/api.json", {
      params: {
        rss_url: "https://medium.com/feed/@erinmontybruce",
      },
    });

    if (response.status === 200) {
      setPosts(response.data.items);
      setAuthorImg(response.data.feed.image);
    } else {
      throw new Error("Failed to fetch blog posts");
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    setError("Failed to load blog posts. Please try again later.");
  } finally {
    setLoading(false);
  }
};
```

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository:
2. Navigate to the project directory:
3. Install the dependencies:

## Usage

To run the development server:
The blog will be available at `http://localhost:3000`.

To build the project for production:

## API

This project uses the [RSS2JSON API](https://rss2json.com/) to fetch blog posts from a Medium RSS feed. The API call is made in the `getPostData` function using the Fetch API.

## Contributing

Contributions to Erin's Dev Blog are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

---

Created by [erinmontybruce@gmail.com](https://medium.com/@erinmontybruce) - Feel free to contact me!

```

```
