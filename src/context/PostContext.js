import { useContext, createContext, useState } from "react";
import axios from "axios";

export const PostContext = createContext();

export function usePosts() {
  return useContext(PostContext);
}

export function PostsProvider({ children }) {
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const [posts, setPosts] = useState([
    {
      title: "",
      content: "",
    },
  ]);

  const [comments, setComments] = useState([]);
  const [newPostComment, setPostComment] = useState(false);

  const [singlePost, setSinglePost] = useState({
    title: "",
    content: "",
    url: "",
  });

  const [category, setCategory] = useState([
    {
      category: "",
    },
  ]);

  const [featuredImg, setFeaturedImg] = useState([]);
  const [allPostImgs, setAllPostImgs] = useState([]);

  const fetchFeaturedImage = async () => {
    try {
      const response = await axios.get(`${backendURL}/featuredPhoto`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = response.data;
      setFeaturedImg(result);
    } catch (e) {
      console.error(e);
    }
  };

  const allPostImages = async () => {
    try {
      const response = await axios.get(`${backendURL}/photos`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = response.data;
      setAllPostImgs(result);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${backendURL}/posts`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.data;
      setPosts(result);
    } catch (e) {
      console.error(e);
    }
  };


  const fetchSinglePost = async (postId) => {
    try {
      const response = await axios.get(`${backendURL}/posts/${postId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = response.data;
      setSinglePost(result);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`${backendURL}/comments`, {
        params: {
          post: postId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backendURL}/categories`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = response.data;
      setCategory(result);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PostContext.Provider
      value={{
        backendURL,
        posts,
        setPosts,
        fetchPosts,
        category,
        singlePost,
        fetchCategories,
        fetchSinglePost,
        comments,
        setComments,
        fetchComments,
        newPostComment,
        setPostComment,
        featuredImg, 
        setFeaturedImg,
        allPostImgs, 
        setAllPostImgs,
        fetchFeaturedImage,
        allPostImages
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
