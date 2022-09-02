import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Details from "./pages/Details";
import HomePage from "./pages/HomePage";
import Notfound from "./pages/NotFound";

function App() {
  const [countries, setCountries] = useState([]);

  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage countries={countries} setCountries={setCountries} />
            }
          />
          <Route path="/country/:name" element={<Details />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
