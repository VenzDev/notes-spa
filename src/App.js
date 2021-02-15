import Navbar from "./components/Navbar";
import Wrapper from "./components/Wrapper";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotePage from "./pages/NotePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Wrapper>
      <ToastContainer />
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/note/:id" component={NotePage} />
      </Switch>
    </Wrapper>
  );
}

export default App;
