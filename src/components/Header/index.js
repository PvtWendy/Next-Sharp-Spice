import Link from "next/link";
import styles from "./style.module.css";
export default function Header(props) {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <img src={"/Logo.png"}></img>
      </Link>

      <div>
        <Link href="/" className={styles.navItems}>
          Home
        </Link>
        <Link href="/contact" className={styles.navItems}>
          Contact
        </Link>
        <Link href="/about" className={styles.navItems}>
          About
        </Link>
      </div>
    </nav>
  );
}
