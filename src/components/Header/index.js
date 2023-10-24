import Link from "next/link";
import styles from "./style.module.css";
export default function Header(props) {
  return (
    <nav className={styles.nav}>
      <Link href="/about">
        <img src={"/Logo.png"}></img>
      </Link>

      <div>
        <button onClick={props.Home} class={styles.navItems}>
          Home
        </button>
        <button onClick={props.Contact} class={styles.navItems}>
          Contact
        </button>
        <button onClick={props.About} class={styles.navItems}>
          About
        </button>
      </div>
    </nav>
  );
}
