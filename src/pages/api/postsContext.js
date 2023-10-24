import { createContext, useContext, useEffect, useReducer, useState } from "react";
//Creates Context and calls initialStates
const PostsContext = createContext();

//Function to be able to call posts anywhere
export const usePosts = () => {
  return useContext(PostsContext);
};
//Anything wrapped in this can use the Posts Context
export const PostsProvider = ({ children }) => {
  //Creates a simple array containing the post states
  const [posts, setPosts] = useState([false, false, false, false, false]);

  const reducer = (state, action) => {
    switch (action.type) {
      case "reset":
        return [false, false, false, false, false];
      //Opens the post
      case "OpenPost":
        const invertedState = state.map((post, index) => {
          if (index === action.index) {
            return { ...post, state: true };
          } else {
            return post;
          }
        });
        return invertedState;
    }
    return state;
  };

  const [state, dispatch] = useReducer(reducer, posts);
  return (
    <PostsContext.Provider value={{ postStates: state, dispatch }}>
      {children}
    </PostsContext.Provider>
  );
};
