import { useEffect, useState } from "react";
import axios from "axios";
import "./Blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [authorImg, setAuthorImg] = useState([]);

  const getPostData = () => {
    axios
      .get(
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@erinmontybruce"
      )
      .then((res) => {
        setPosts(res.data.items);
        setAuthorImg(res.data.feed.image);
      })
      .catch((error) => {
        console.error("Error using axios:", error);
      });
  };
  useEffect(() => {
    getPostData();
  }, []);

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
