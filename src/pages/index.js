import Article from '@/components/Article';
import Carousel from '@/components/Carousel';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useState } from 'react';
export default function Home() {
  const [page, setPage] = useState("home");
  let posts = [1,2,3]
  const renderedArticles = posts.map((props, index) => (
    <Article
      key={`Article${index}`}
      image={posts[index].image}
      title={posts[index].title}
      state={index % 2 == 0 ? "left" : "right"}
      text={posts[index].shortPost}
      full={posts[index].longPost}
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
