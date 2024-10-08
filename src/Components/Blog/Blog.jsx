import { useEffect, useState } from "react";
import "./Blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [authorImg, setAuthorImg] = useState([]);
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
      <div className="blog-container">
        <div className="blog-content">
          <div className="title">
            <a
              href="https://medium.com/@erinmontybruce"
              target="_blank"
              rel="noreferrer"
              className="title-a"
            >
              <div>
                Erin's Medium Blog
                <img
                  src={`${authorImg}`}
                  alt="author img"
                  className="author-img"
                />
              </div>
            </a>
          </div>

          <div className="blog-block">
            {posts.map((post) => (
              <div className="posts" key={post.guid}>
                <h2>{post.title}</h2>
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
