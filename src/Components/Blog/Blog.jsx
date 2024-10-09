import { useEffect, useState } from "react";
import "./Blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [authorImg, setAuthorImg] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPostData = () => {
    setLoading(true);
    fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@erinmontybruce"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data.items);
        setAuthorImg(data.feed.image);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog posts:", error);
        setError("Failed to load blog posts. Please try again later.");
        setLoading(false);
      });
  };

  useEffect(() => {
    getPostData();
  }, []);

  if (loading) {
    return <div className="loading">Loading blog posts...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="blog-overlay">
      {[...Array(50)].map((_, i) => (
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
              <img
                src={authorImg}
                alt="author img"
                className="author-img horizontal-glitch"
                data-text=""
              />
            </a>
          </div>

          <div className="blog-block">
            {posts.map((post) => (
              <div className="posts" key={post.guid}>
                <h2 className="glitch-text" data-text={post.title}>
                  {post.title}
                </h2>
                <p dangerouslySetInnerHTML={{ __html: post.content }} />
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
        </div>
      </div>
    </div>
  );
};

export default Blog;
