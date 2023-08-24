import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import CreateAccountPage from "./components/CreateAccountPage";
import "./App.scss";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Visitante from "./components/Visitante";
import MyAccount from "./components/MyAccount";
import Calculadora from "./components/Calculadora";
import VehicleSelection from "./components/VehicleSelection";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App() {
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <main ref={parent}>
          <Routes>
            <Route path="/" element={<WelcomePage />} exact />
            <Route path="/crear-cuenta" element={<CreateAccountPage />} />
            <Route path="/visitante" element={<Visitante />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/calculadora" element={<Calculadora />} />
            <Route path="/vehicle-selection" element={<VehicleSelection />} />
          </Routes>
        </main>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
