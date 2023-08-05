import React, { useEffect } from "react";
import "./App.scss";
import Form from "./components/Form/Form";
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

export default function App() {
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(`Latitude: ${position.coords.latitude}`);
          console.log(`Longitude: ${position.coords.longitude}`);
        },
        (error) => {
          console.error(`Error Code = ${error.code} - ${error.message}`);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser");
    }
  }, []);

  return (
    <>
      <header>
        <Navigation />
        <HeroSection />
      </header>
      <main>
        <ContactSection />
        <Form />
      </main>
      <footer>
        <p>&copy; 2023 Translogistica Macias</p>
      </footer>
    </>
  );
}
