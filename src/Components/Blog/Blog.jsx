import React, { useEffect, useState } from "react";
import { AlertCircle, Loader2, X, HelpCircle } from "lucide-react";
import "./Blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [authorImg, setAuthorImg] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCookieNotice, setShowCookieNotice] = useState(false);

  useEffect(() => {
    const getPostData = () => {
      setLoading(true);
      fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@erinmontybruce",
        {
          method: "GET",
          mode: "cors",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const processedPosts = data.items.slice(0, 5).map((post) => ({
            ...post,
            content: sanitizeContent(post.content),
          }));
          setPosts(processedPosts);
          setAuthorImg(data.feed.image);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching blog posts:", error);
          setError("Failed to load blog posts. Please try again later.");
          setLoading(false);
        });
    };

    getPostData();
  }, []);

  // Function to sanitize Medium content
  const sanitizeContent = (content) => {
    const temp = document.createElement("div");
    temp.innerHTML = content;

    // Remove Medium's tracking iframes
    temp.querySelectorAll("iframe").forEach((iframe) => iframe.remove());

    // Replace giphy iframes with img tags
    temp.querySelectorAll("figure").forEach((figure) => {
      const iframe = figure.querySelector('iframe[src*="giphy.com"]');
      if (iframe) {
        const giphyUrl = iframe.src;
        const img = document.createElement("img");
        img.src = giphyUrl.replace("iframe", "media");
        img.className = "giphy-img";
        iframe.replaceWith(img);
      }
    });

    // Handle responsive images
    temp.querySelectorAll("img").forEach((img) => {
      img.className = "responsive-img";
      img.loading = "lazy";
    });

    // Add a custom class to all <pre> tags
    temp.querySelectorAll("pre").forEach((pre) => {
      pre.className = "code-block";
    });

    return temp.innerHTML;
  };

  if (loading) {
    return (
      <div className="loading">
        <Loader2 className="loading-spinner" />
        <span>Loading blog posts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <AlertCircle className="error-icon" />
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="blog-overlay">
      {/* "?" Button to toggle the cookie notice */}
      <button
        className="help-button"
        onClick={() => setShowCookieNotice(!showCookieNotice)}
        aria-label="Show cookie notice"
      >
        <HelpCircle size={24} />
      </button>

      {/* Cookie Notice Modal */}
      {showCookieNotice && (
        <div className="cookie-notice">
          <p>
            This blog uses RSS feeds which may require third-party cookies. If
            content isn't loading, you may need to allow third-party cookies in
            your browser settings.
          </p>
          <button
            className="cookie-notice-close"
            onClick={() => setShowCookieNotice(false)}
            aria-label="Close notice"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {[...Array(2000)].map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <div className="scanning-line"></div>
      <div className="blog-container">
        <div className="blog-content">
          <div className="title">
            <a
              href="https://medium.com/@erinmontybruce"
              target="_blank"
              rel="noreferrer"
              className="title-a"
            >
              <span className="horizontal-glitch" data-text="Erin's Dev Blog">
                Erin's Dev Blog
              </span>
              {authorImg && (
                <img
                  src={authorImg}
                  alt="author img"
                  className="author-img horizontal-glitch"
                  data-text=""
                />
              )}
            </a>
          </div>

          <div className="blog-block">
            {posts.map((post) => (
              <div className="posts" key={post.guid}>
                <h2 className="glitch-text" data-text={post.title}>
                  {post.title}
                </h2>
                <div
                  className="posts-p"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                <a
                  href={post.link}
                  target="_blank"
                  rel="noreferrer"
                  className="posts-a"
                >
                  Read more
                </a>
              </div>
            ))}
          </div>
          <a
            href="https://medium.com/@erinmontybruce"
            target="_blank"
            rel="noreferrer"
            className="posts-a"
          >
            See All Posts
          </a>
        </div>
      </div>
    </div>
  );
};

export default Blog;
