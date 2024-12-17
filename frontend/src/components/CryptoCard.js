import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { io } from "socket.io-client";

const CryptoCard = ({ crypto }) => {
  const [price, setPrice] = useState(crypto.current_price || "Loading...");
  const [change, setChange] = useState(crypto.price_change_percentage_24h || "-");
  const [volume, setVolume] = useState(crypto.market_cap || "-");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Conectar ao WebSocket
    const socket = io("http://127.0.0.1:5000");

    // Receber atualizações da cripto
    socket.on("crypto_update", (data) => {
      const updatedCrypto = data.find((item) => item.symbol === crypto.symbol);
      if (updatedCrypto) {
        updatePrice(updatedCrypto);
      }
    });

    return () => {
      socket.disconnect();
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [crypto]);

  // Aguardar até o canvas ser montado
  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: `${crypto.name} Price`,
              data: [],
              borderColor: "#4cd137", // Cor da linha do gráfico
              borderWidth: 2,
              fill: false,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: { beginAtZero: false },
            x: { grid: { display: false } },
          },
        },
      });
    }
  }, [crypto]);

  const updatePrice = (updatedCrypto) => {
    const newPrice = updatedCrypto.current_price;

    setPrice(`$${newPrice.toFixed(2)}`);
    setChange(`${updatedCrypto.price_change_percentage_24h.toFixed(2)}%`);
    setVolume(`$${updatedCrypto.market_cap.toFixed(0)}`);

    if (chartInstance.current) {
      // Atualizar o gráfico com o novo preço
      const now = new Date();
      const timeLabel = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

      chartInstance.current.data.labels.push(timeLabel);
      chartInstance.current.data.datasets[0].data.push(newPrice);

      // Limitar a quantidade de dados no gráfico para não sobrecarregar
      if (chartInstance.current.data.labels.length > 60) {
        chartInstance.current.data.labels.shift();
        chartInstance.current.data.datasets[0].data.shift();
      }

      chartInstance.current.update();
    }
  };

  return (
    <div className="card">
      <h2>
        <img src={crypto.image} alt={crypto.name} style={{ width: 20, marginRight: 8 }} />
        {crypto.name} ({crypto.symbol.toUpperCase()})
      </h2>
      <div className="price">{price}</div>
      <canvas ref={chartRef} style={{ maxWidth: "100%", height: "300px" }}></canvas>
      <div className="stat-grid">
        <div className="stat">24h Change: <span>{change}</span></div>
        <div className="stat">Market Cap: <span>{volume}</span></div>
      </div>
    </div>
  );
};

export default CryptoCard;
