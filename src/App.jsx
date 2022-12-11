import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="*" element={<div>pagina 404</div>} />`
      </Routes>
    </BrowserRouter>
  );
}

export default App;
