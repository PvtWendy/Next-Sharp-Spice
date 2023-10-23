//TODO: this will only be used to update whether a post is open afterwards
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
//Creates Context and calls initialStates
const PostsContext = createContext();

//Function to be able to call posts anywhere
export const usePosts = () => {
  return useContext(PostsContext);
};
//Anything wrapped in this can use the Posts Context
export const PostsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState();
  useEffect(() => {
    fetch("/api/fetchPosts")
      .then((response) => {
        return response.json();
      })
      .then((postsData) => {
        setData(postsData);
      });
  }, []);
  useEffect(() => {
    if (data.length != 0) {
      setPosts(data);
    } else {
      setPosts([]);
    }

    console.log(posts);
  }, [data]);

  const reducer = (state, action) => {
    return state;
  };

  const [state, dispatch] = useReducer(reducer, posts);
  return (
    <PostsContext.Provider value={{ posts: state, dispatch }}>{children}</PostsContext.Provider>
  );
};
