import { usePosts } from "@/pages/api/postsContext";
import styles from "./style.module.css";
import React, { useEffect } from "react";
import { useState } from "react";
export default function Carousel(props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  //Loads the post,and only lets the post update after data is complete
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
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

  //Dispatches function to open post
  const closeBtn = (index) => {
    dispatch({ type: "OpenPost", index: index });
  };

  //Defines slide to navigate to
  const navigateSlides = (offset) => {
    const slides = document.querySelectorAll(`.${styles.slide}`);
    const newCurrentSlide =
      (currentSlide + offset + slides.length) % slides.length;
    setCurrentSlide(newCurrentSlide);
  };

  //Updates slide after the async useState update
  useEffect(() => {
    const slides = document.querySelectorAll(`.${styles.slide}`);
    slides.forEach((slide, index) => {
      const translateValue = (index - currentSlide) * 100;
      slide.style.transform = `translateX(${translateValue}%)`;
    });
  }, [currentSlide]);

  useEffect(() => {
    console.log(posts);
  }, []);

  //Conditional Rendering for Carousel
  switch (posts.length) {
    //Renders placeholder post
    case 0:
      return (
        <article className={styles.slider}>
          <section className={styles.slide}>
            <img src="/Logo.png"></img>
            <p>Placeholder</p>
          </section>
        </article>
      );
      break;

    //Renders when there is 1 post
    case 1:
      return (
        <article className={styles.slider}>
          <section className={styles.slide}>
            <a onClick={() => closeBtn(0)}>
              <img src={posts[0].image} alt="Red Kitchen" />
              <p>{posts[0].title}</p>
            </a>
          </section>
        </article>
      );
      break;

    //Renders when there are 2 posts
    case 2:
      return (
        <article className={styles.slider}>
          <section
            className={styles.slide}
            style={{ transform: `translateX(0%)` }}
          >
            <a onClick={() => closeBtn(0)}>
              <img src={posts[0].image} alt="Red Kitchen" />
              <p>{posts[0].title}</p>
            </a>
          </section>
          <section
            className={styles.slide}
            style={{ transform: `translateX(100%)` }}
          >
            <a onClick={() => closeBtn(1)}>
              <img src={posts[1].image} alt="Red Kitchen" />
              <p>{posts[1].title}</p>
            </a>
          </section>
          <button className="btn btn-next" onClick={() => navigateSlides(1)}>
            {">"}
          </button>
          <button className="btn btn-prev" onClick={() => navigateSlides(-1)}>
            {"<"}
          </button>
        </article>
      );

    //Renders when there is 3 or more posts

    default:
      return (
        <article className={styles.slider}>
          <section
            className={styles.slide}
            style={{ transform: `translateX(0%)` }}
          >
            <a onClick={() => closeBtn(0)}>
              <img src={posts[0].image} alt="Red Kitchen" />
              <p>{posts[0].title}</p>
            </a>
          </section>
          <section
            className={styles.slide}
            style={{ transform: `translateX(100%)` }}
          >
            <a onClick={() => closeBtn(1)}>
              <img src={posts[1].image} alt="Red Kitchen" />
              <p>{posts[1].title}</p>
            </a>
          </section>
          <section
            className={styles.slide}
            style={{ transform: `translateX(200%)` }}
          >
            <a onClick={() => closeBtn(2)}>
              <img src={posts[2].image} alt="Red Kitchen" />
              <p>{posts[2].title}</p>
            </a>
          </section>
          <button className={styles.btnNext} onClick={() => navigateSlides(1)}>
            {">"}
          </button>
          <button className={styles.btnPrev} onClick={() => navigateSlides(-1)}>
            {"<"}
          </button>
        </article>
      );
      break;
  }
}
