import "./App.scss";
import Form from "./components/Form/Form";
import truckImage from "./assets/9.png";
import Navigation from "./components/Navigation";

const HeroSection = () => (
  <section id="hero">
    <h1>Translogistica Macias</h1>
    <span
      onClick={() =>
        document
          .getElementById("calculadora")
          .scrollIntoView({ behavior: "smooth" })
      }
    >
      has una reserva hoy!
    </span>
  </section>
);

const ContactSection = () => (
  <section id="contacto">
    <h1>
      Bienvenido a Translogisticas Macias, su solución completa y segura en
      logística. Nos distinguimos por nuestra eficiencia, rapidez y compromiso
      con el cliente.
    </h1>
    <ul>
      <li>
        <a href="https://www.facebook.com/p/Translogistica-Mac%C3%ADas-100070950350531">
          Facebook
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/mudanzaycargamacias/?hl=en">
          Instagram
        </a>
      </li>
      <li>
        <a href="">Email</a>
      </li>
      <li>
        <a href="">WhatsApp</a>
      </li>
    </ul>
  </section>
);

const ServicesSection = () => (
  <section id="servicios">
    <ul>
      <h1>Servicios</h1>
      <li>
        <span>
          <strong>&gt;</strong>
        </span>{" "}
        Rastreo en Tiempo Real
      </li>
      <li>
        <span>
          <strong>&gt;</strong>
        </span>{" "}
        Empaque Seguro y Eficiente
      </li>
      <li>
        <span>
          <strong>&gt;</strong>
        </span>{" "}
        Asistencia en Desempaque: Desembalaje Cuidadoso y Organizado
      </li>
      <li>
        <span>
          <strong>&gt;</strong>
        </span>{" "}
        Mudanzas sin Estrés: Relocación de sus Pertenencias
      </li>
    </ul>
    <img src={truckImage} alt="Camión en un mapa" />
  </section>
);

const CalculatorSection = () => (
  <section id="calculadora">
    <h1>Calculadora </h1>
    <p>
      Utilice nuestra calculadora para obtener una estimación rápida del costo
      de su mudanza o transporte.
    </p>
    <Form />
  </section>
);

const CareersSection = () => (
  <section id="carreras">
    <h1>Trabaja con Nosotros</h1>
    <p>
      Trabajar con nosotros abre oportunidades para acceder a una gran cantidad
      de clientes y ser parte de una comunidad en crecimiento.
    </p>
    <p>ofrecemos</p>
    <ul>
      <li>Acceso a una gran cantidad de clientes</li>
      <li>Estructura de tarifas transparente</li>
      <li>Oportunidades de crecimiento y desarrollo</li>
    </ul>
    <p>
      ¡Únete a nuestro equipo hoy y sé parte de un servicio de transporte líder
      en la industria en Guayaquil, Ecuador!
    </p>
    <a href="careers.html">Contacto</a>
  </section>
);

export default function App() {
  return (
    <>
      <header>
        <Navigation />
        <HeroSection />
      </header>
      <main>
        <ContactSection />
        <ServicesSection />
        <CalculatorSection />
        <CareersSection />
      </main>
      <footer>
        <p>&copy; 2023 Transporte Seguro Alquiler de Camiones Guayaquil</p>
      </footer>
    </>
  );
}
