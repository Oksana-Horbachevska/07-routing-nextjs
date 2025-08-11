"use client";

import { useState } from "react";
import css from "./TagsMenu.module.css";

const categories = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {categories.map((categorie) => (
            <li key={categorie} className={css.menuItem}>
              <a
                href={`/notes/filter/${categorie}`}
                className={css.menuLink}
                onClick={toggle}
              >
                {categorie}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
