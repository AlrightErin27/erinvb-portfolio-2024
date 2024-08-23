// src/components/Blog.jsx
import React from "react";
import "./Blog.css"; // Import the CSS

const Blog = () => {
  return (
    <div className="blog-container">
      <div className="blog-content">
        <h1>Blog Page</h1>
        <p>
          Welcome to the Blog page! This section will take up the entire
          available space below the navbar.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam.
        </p>
        <p>
          Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis
          ipsum. Praesent mauris.
        </p>
        <p>
          Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum
          lacinia arcu eget nulla.
        </p>
        <p>
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Curabitur sodales ligula in libero.
        </p>
      </div>
    </div>
  );
};

export default Blog;
