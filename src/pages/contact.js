import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect } from "react";
import { usePosts } from "./api/postsContext";
export default function Contact() {
  const {postStates , dispatch} = usePosts()
  useEffect(() => {
    dispatch({type:"reset"})
  }, [])
  return (
    <div>
      <Header/>
      <form>
        <label>Subject</label>
        <br />
        <input type="text" placeholder="E-mail's subject" />
        <br />
        <label>E-mail</label>
        <br />
        <input type="email" placeholder="Your E-mail" />
        <br />
        <label>Message:</label>
        <br />
        <textarea name="body" cols="30" rows="5" placeholder="Your Message"></textarea>
        <br />
        <input type="submit" id="button" value="Send" />
      </form>
      <Footer/>
    </div>
  );
}
