import React, { useState, useEffect } from "react";
import CryptoCard from "./CryptoCard"; // Importa o CryptoCard

const Dashboard = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/crypto") // Supondo que essa URL forneça dados das criptomoedas
      .then((response) => response.json())
      .then((data) => {
        console.log("Dados recebidos da API:", data); // Verifique os dados
        setCryptoData(data); // Defina os dados recebidos no estado
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div className="dashboard">
      {cryptoData.length > 0 ? (
        cryptoData.map((crypto) => (
          <CryptoCard 
            key={crypto.symbol} 
            crypto={crypto} // Passe o objeto completo como prop
          />
        ))
      ) : (
        <div>Loading data...</div>
      )}
    </div>
  );
};

export default Dashboard;
