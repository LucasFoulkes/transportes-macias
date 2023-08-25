import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import CreateAccountPage from "./components/CreateAccountPage";
import "./App.scss";
import Visitante from "./components/Visitante";
import MyAccount from "./components/MyAccount";
import Calculadora from "./components/Calculadora";
import VehicleSelection from "./components/VehicleSelection";
import { QueryClient, QueryClientProvider } from "react-query";
import Confirmar from "./components/Confirmar";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} exact />
          <Route path="/crear-cuenta" element={<CreateAccountPage />} />
          <Route path="/visitante" element={<Visitante />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/calculadora" element={<Calculadora />} />
          <Route path="/vehicle-selection" element={<VehicleSelection />} />
          <Route path="/confirmar" element={<Confirmar />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
