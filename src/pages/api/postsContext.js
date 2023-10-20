import { createContext, useContext, useEffect, useReducer, useState } from "react";
import postsData from "../api/postsData.json";
//Creates Context and calls initialStates
const PostsContext = createContext();


//Function to be able to call posts anywhere
export const usePosts = () => {
  return useContext(PostsContext);
};

//Anything wrapped in this can use the Posts Context
export const PostsProvider = ({ children }) => {
  const reducer = (state, action) => {
    return state;
  };
  const [data, setData] = useState();
useEffect(() => {
  fetch("./fetchPosts.js")
    .then((res) => res.json)
},[])
  
  const [state, dispatch] = useReducer(reducer, data);

  return (
    <PostsContext.Provider value={{ posts: state, dispatch }}>{children}</PostsContext.Provider>
  );
};
