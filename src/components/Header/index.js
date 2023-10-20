import styles from "./style.module.css";
export default function Header(props) {
  return (
    <nav className={styles.nav}>
      <button onClick={props.Home}>
        <img src={"/Logo.png"}></img>
      </button>
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
