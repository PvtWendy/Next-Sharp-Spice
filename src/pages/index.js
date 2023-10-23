import Article from "@/components/Article";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
export default function Home() {
  const [page, setPage] = useState("home");

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

  const shortPostJSX = (index)=>{
    return(
      <div>
        <h1>{posts[index].shortPost.h1}</h1>
        <p>{posts[index].shortPost.p}</p>
      </div>
    )
  }

  const renderedArticles = posts.map((props, index) => (
    <Article
      key={`Article${index}`}
      image={posts[index].image}
      title={posts[index].title}
      text={shortPostJSX(index)}
      state={index % 2 == 0 ? "left" : "right"}
      index={index}
    />
  ));

  switch (page) {
    case "home":
      return (
        <div>
          <Header
            Home={() => setPage("home")}
            About={() => setPage("about")}
            Contact={() => setPage("contact")}
          />
          <Carousel />
          <section className="articleContainer" id="postsContainer">
            {renderedArticles}
          </section>
          <Footer />
        </div>
      );
    case "contact":
      return (
        <div>
          <Header
            Home={() => setPage("home")}
            About={() => setPage("about")}
            Contact={() => setPage("contact")}
          />
          <Contact />
          <Footer />
        </div>
      );
    case "about":
      return (
        <div>
          <Header
            Home={() => setPage("home")}
            About={() => setPage("about")}
            Contact={() => setPage("contact")}
          />
          <About />
          <Footer />
        </div>
      );
    default:
      break;
  }
}
