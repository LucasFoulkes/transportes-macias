import "./App.scss";
import Form from "./components/Form/Form";

export default function App() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <a href="#servicios" onClick={(e) => e.preventDefault()}>
                <button
                  onClick={() =>
                    document
                      .getElementById("servicios")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Servicios
                </button>
              </a>
            </li>
            <li>
              <a href="#acerca-de" onClick={(e) => e.preventDefault()}>
                <button
                  onClick={() =>
                    document
                      .getElementById("acerca-de")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Acerca de Nosotros
                </button>
              </a>
            </li>
            <li>
              <a href="#contacto" onClick={(e) => e.preventDefault()}>
                <button
                  onClick={() =>
                    document
                      .getElementById("contacto")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Contacto
                </button>
              </a>
            </li>
            <li>
              <a href="#carreras" onClick={(e) => e.preventDefault()}>
                <button
                  onClick={() =>
                    document
                      .getElementById("carreras")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Trabaja con Nosotros
                </button>
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="acerca-de">
          <h1>Acerca de Nosotros</h1>
          <p>
            El transporte seguro no es un lujo; es una necesidad. En Transporte
            Seguro Guayaquil, garantizamos que todos nuestros conductores tienen
            la documentación adecuada y no tienen antecedentes penales. Esta
            dedicación a la seguridad asegura que sus bienes sean manejados con
            la máxima cuidado e integridad.
          </p>
        </section>
        <section id="servicios">
          <h1>Nuestros Servicios</h1>
          <p>
            Nuestro procedimiento de trabajo es sencillo pero eficaz. Usted
            elige los lugares de recogida y entrega, y paga directamente al
            camionero. Incluso puede rastrear cuándo llegará el camionero. Con
            nosotros, tiene el control total de su envío y puede estar seguro de
            que sus bienes están en buenas manos.
          </p>
          <ul>
            <li>Transporte de Mercancías</li>
            <li>Mudanzas Residenciales y Comerciales</li>
            <li>Alquiler de Camiones</li>
            <li>Servicios Personalizados</li>
          </ul>
        </section>
        <section id="calculadora">
          <h1>Calculadora de Costos</h1>
          <p>
            Utilice nuestra calculadora para obtener una estimación rápida del
            costo de su mudanza o transporte.
          </p>
          <Form />
        </section>
        <section id="contacto">
          <h1>Contacto</h1>
          <p>
            Póngase en contacto con nosotros para más información o para
            programar su próximo servicio en Guayaquil, Ecuador.
          </p>
          <address>
            Correo: info@transporteseguroguayaquil.com
            <br />
            Teléfono: 098 089 7073
          </address>
        </section>
        <section id="carreras">
          <h1>Trabaja con Nosotros</h1>
          <p>
            Trabajar con nosotros abre oportunidades para acceder a una gran
            cantidad de clientes y ser parte de una comunidad en crecimiento. Al
            trabajar con nosotros, solo paga un 3% del viaje por adelantado y
            recibe crédito para usar o mejorar su servicio. Nuestro modelo
            garantiza una compensación justa y apoya su crecimiento en la
            industria.
          </p>
          <p>He aquí por qué deberías elegirnos:</p>
          <ul>
            <li>Acceso a una gran cantidad de clientes</li>
            <li>Estructura de tarifas transparente</li>
            <li>Oportunidades de crecimiento y desarrollo</li>
            <li>Ambiente de trabajo solidario</li>
          </ul>
          <p>
            ¡Únete a nuestro equipo hoy y sé parte de un servicio de transporte
            líder en la industria en Guayaquil, Ecuador!
          </p>
          <a href="careers.html">Ver Oportunidades</a>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Transporte Seguro Alquiler de Camiones Guayaquil</p>
      </footer>
    </>
  );
}
