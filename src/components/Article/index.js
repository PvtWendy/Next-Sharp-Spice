import { usePosts } from "@/pages/api/postsContext";
import { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
export default function Article(props) {
  //Loads the post,and only lets the post update after data is complete
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const { postStates, dispatch } = usePosts();
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
  }, [data]);

  //Fadein Fadeout Animation
  const mountedStyle = {
    animation: `${styles.inAnimation} 500ms ease-in`,
  };
  const unmountedStyle = {
    animation: `${styles.outAnimation} 500ms ease-out`,
    animationFillMode: "forwards",
  };
  const scrollRef = useRef(null);

  //Effect to scroll to ref when the state of the current post changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" }, true);
    }
  }, [postStates[props.index]]);

  //Function to open the current post
  const closeBtn = () => {
    dispatch({ type: "OpenPost", index: props.index });
  };

  /*
  Conditionally rendered component, only renders when the button wasn't pressed
  And renders left and right variants based on props.state property
  */

  if (!postStates[props.index]) {
    return (
      <article
        className={props.state == "left" ? "left" : "right"}
        style={postStates[props.index] ? unmountedStyle : null}
      >
        <img src={props.image} />
        <div>
          {props.text}
          <button onClick={() => closeBtn()}>Read More</button>
        </div>
      </article>
    );
  } else {
    return (
      <div ref={scrollRef} style={postStates[props.index] ? mountedStyle : null}>
        <article className={styles.articlePosts}>
          <img src={props.image}></img>
          <h1>{props.title}</h1>
          {props.full}
        </article>
      </div>
    );
  }
}
