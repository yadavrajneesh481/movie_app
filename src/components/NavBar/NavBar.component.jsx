import Logo from "../Logo/Logo.component";
import "./NavBar.styles.scss";

export default function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
