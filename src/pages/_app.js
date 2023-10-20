import "@/styles/globals.css";
import { PostsProvider } from "./api/postsContext";
export default function App({ Component, pageProps }) {
  return (
    <PostsProvider>
      <Component {...pageProps} />
    </PostsProvider>
  );
}
