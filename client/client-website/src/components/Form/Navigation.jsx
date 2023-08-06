export default function Navigation() {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav>
      <ul>
        <li onClick={() => scrollToSection("servicios")}>servicios</li>
        <li onClick={() => scrollToSection("contacto")}>contacto</li>
      </ul>
    </nav>
  );
}
