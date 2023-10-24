import Link from "next/link";
import styles from "./style.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <img src={"/Titleless-Logo.png"} alt="" />
      <section>
        <h2>Redirect</h2>
        <Link href="/">Home</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/about">About</Link>
      </section>
      <section>
        <h2>Contact</h2>
        <a href="mailto:wendy@gmail.com">Email</a>
        <a href="tel:+55(65)93805">Call</a>
      </section>
    </footer>
  );
}
