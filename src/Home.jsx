import { useEffect, useState } from "react";
import { usePosts } from "./context/PostContext";
import { useLooks } from "./context/LookContext";
import FeaturedPosts from "./components/blog/FeaturedPosts";
import RecentPosts from "./components/blog/RecentPosts";
import LookModal from "./components/looks/LookModal";
import { AiOutlineVerticalLeft } from "react-icons/ai";


import { Link } from "react-router-dom";

export default function Home() {
  const { fetchPosts, fetchCategories } = usePosts();
  const { looks, fetchLooks, handleLookClick } = useLooks();

  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  const filteredLooks = looks.filter((look) => look.categories.includes(2));
  console.log(filteredLooks);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    fetchLooks();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{marginBottom:'10vmin', marginTop: "10vmin"}}>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginBottom: "10vmin"}}
      >
        {filteredLooks.slice(0, 3).map((look, index) => (
          <img
            key={index}
            src={look.url}
            alt={`Look ${index + 1}`}
            style={{ width: "30vmin", height: "50vmin", borderRadius: "10px" }}
            onClick={() => handleLookClick(look)}
          />
        ))}
      </div>
      <div className="strike-through-line">
        <div className="strike-through-text">Featured</div>
      </div>
      <FeaturedPosts />
      <div className="strike-through-line">
        <div className="strike-through-text">Recent</div>
      </div>
      <RecentPosts />
      <button className="btn">
        {/* {isAuth ? ( */}
          {/* <Link to="/logout">Logout</Link> */}
        {/* ) : ( */}
          <Link to="/category" style={{fontSize: '20px'}}>View All <AiOutlineVerticalLeft />
</Link>
        {/* )} */}
      </button>
      <LookModal />
    </div>
  );
}
