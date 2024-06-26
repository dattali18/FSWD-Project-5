import { useEffect, useState } from "react";

import PostForm from "../components/posts/PostForm.jsx";
import PostList from "../components/posts/PostList.jsx";
import SearchPost from "../components/posts/SearchPost";

import "../components/styles/Button.css";
import "../components/styles/Form.css";
import "./styles/Posts.css";

import { getPosts } from "../utils/Post.js";
import { getUserByUsername } from "../utils/User.js";
import { getLoggedUser } from "../utils/loggedUsers.js";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  // const [usersPosts, setUsersPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  // const [showUserPosts, setShowUserPosts] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const loggedUser = getLoggedUser();

      if (!loggedUser) {
        // go to the login page
        window.location.href = "/login";
        return;
      }

      const users = await getUserByUsername(loggedUser.username);
      setUserId(users[0].id);

      // let id = users[0].id;
      // const response1 = await getPostsByUser(id);
      // setUsersPosts(response1.data);

      const response = await getPosts();
      setPosts(response.data);
      setFilteredPosts(response.data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="main">
      <div className="header-section">
        <h1 className="posts-header">Posts</h1>
        <button className="btn btn-blue" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form" : "Show Form"}
        </button>
      </div>
      {showForm && <PostForm setPosts={setPosts} userId={userId} />}
      {/* <div className="user-posts">
        <h2 className="subheader">Your Posts</h2>
        <button
          className="btn btn-blue btn-sm"
          onClick={() => setShowUserPosts(!showUserPosts)}
        >
          {showForm ? "Hide" : "Show"}
        </button>
        {showUserPosts && (
          <PostList
            userId={userId}
            posts={usersPosts}
            setPosts={setPosts}
            setFilteredPosts={setUsersPosts}
          />
        )}
      </div> */}
      <h2 className="subheader">Search for posts</h2>
      <SearchPost posts={posts} setPosts={setFilteredPosts} />
      <PostList
        userId={userId}
        posts={filteredPosts}
        setPosts={setPosts}
        setFilteredPosts={setFilteredPosts}
      />
    </div>
  );
}
