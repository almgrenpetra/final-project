import { BrowserRouter as Router } from "react-router-dom";
import { routes } from "./routes/routes";
import { Header } from "./components/Header";

export const App = () => {
  return (
    <>
      <Router>
        <Header />
        {routes}
      </Router>
    </>
  );
};
