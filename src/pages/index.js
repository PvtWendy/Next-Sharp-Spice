import Article from "@/components/Article";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
export default function Home() {
  const [page, setPage] = useState("home");

  //Loads the post,and only lets the post update after data loading is complete
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

  //Converts shortPost to an JSX Object
  const shortPostJSX = (index) => {
    return (
      <div>
        <h1>{posts[index].shortPost.h1}</h1>
        <p>{posts[index].shortPost.p}</p>
      </div>
    );
  };

  //Converts longPost to an JSX Object
  const longPostJSX = (i) => {
    return (
      <div>
        {posts[i].longPost.map((item, index) => {
          if (item.hasOwnProperty("h1")) {
            if (item.hasOwnProperty("p")) {
              return (
                <div>
                  <h1>{item.h1}</h1>
                  <p>{item.p}</p>
                </div>
              );
            } else {
              return <h1>{item.h1}</h1>;
            }
          } else if (item.hasOwnProperty("h2")) {
            if (item.hasOwnProperty("p")) {
              return (
                <div>
                  <h2>{item.h2}</h2>
                  <p>{item.p}</p>
                </div>
              );
            } else {
              return <h2>{item.h2}</h2>;
            }
          } else if (item.hasOwnProperty("p")) {
            return <p>{item.p}</p>;
          }
        })}
      </div>
    );
  };

  //Renders Articles with map based on their props
  const renderedArticles = posts.map((props, index) => (
    <Article
      key={`Article${index}`}
      image={posts[index].image}
      title={posts[index].title}
      text={shortPostJSX(index)}
      full={longPostJSX(index)}
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
