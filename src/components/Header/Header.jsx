import React from "react";
import { Logo } from "./components/Logo/Logo";
import styles from "./Header.module.css";
import Button from "../../common/Button/Button";

const Header = () => {
  return (
    <div>
      <header className={styles.header}>
        <Logo />
        <nav>
          <ul>
            <li>Ruslan</li>
            <li>
              <Button text={"Logout"} />
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
