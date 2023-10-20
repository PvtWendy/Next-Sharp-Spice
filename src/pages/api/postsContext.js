import { createContext, useContext, useReducer, useState } from "react";
import postsData from "../api/postsData.json";
//Creates Context and calls initialStates
const PostsContext = createContext();
const [data, setData] = useState();

fetch("./fetchPosts.js")
  .then((res) => res.json)
  .then((data) => setData(data));


console.log(data);
//Function to be able to call posts anywhere
export const usePosts = () => {
  return useContext(PostsContext);
};

//Anything wrapped in this can use the Posts Context
export const PostsProvider = ({ children }) => {
  const reducer = (state, action) => {
    return state;
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <PostsContext.Provider value={{ posts: state, dispatch }}>
      {children}
    </PostsContext.Provider>
  );
};
