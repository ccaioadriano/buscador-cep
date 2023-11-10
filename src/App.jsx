import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./index.css";
import "./style.css";
import api from "./services/api";
function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("O CEP não pode ser vazio");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
    } catch (error) {
      alert("Ops algo deu errado.");
      console.log(error);
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Digite seu cep..."
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
        />

        <button className="button-search" onClick={handleSearch}>
          <FiSearch size={20} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Logradouro: {cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
