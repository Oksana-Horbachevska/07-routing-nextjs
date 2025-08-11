import css from "./sidebar.module.css";

const SidebarNotes = async () => {
  const categories = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];
  return (
    <ul className={css.menuList}>
      {categories.map((categorie) => (
        <li key={categorie} className={css.menuItem}>
          <a href={`/notes/filter/${categorie}`} className={css.menuLink}>
            {categorie}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
