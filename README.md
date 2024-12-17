# Crypto Dashboard

**Crypto Dashboard** is an interactive project that tracks real-time cryptocurrency price variations. The application uses a Flask-based API connected to the **CoinGecko API** and WebSocket for data transmission. The frontend is built with **React**, providing an intuitive interface for displaying information.

---

## ⚡ Technologies Used

### Backend (Flask)
- **Flask**: Python framework for API development.
- **CoinGecko API**: Source of cryptocurrency data.
- **WebSocket**: Real-time data updates.

### Frontend (React)
- **React**: JavaScript library for building user interfaces.
- **WebSocket Client**: Connects to the backend for real-time updates.
- **CSS**: Styling and dashboard responsiveness.

---

## 📈 Features

1. **Real-Time Updates**: Cryptocurrency data is automatically updated using WebSocket.
2. **Integration with CoinGecko**: Reliable and accurate data provided by the CoinGecko API.
3. **User-Friendly Interface**: Interactive dashboard built with React.
4. **Price Monitoring**: Real-time visualization of cryptocurrency price changes.
5. **Responsiveness**: Optimized interface for both desktop and mobile devices.

---

## 🔧 Installation and Setup

### Requirements
- **Python 3.13**
- **Node.js**
- **NPM/Yarn**

### Backend (Flask API)
1. Clone the repository:
   ```bash
   git clone https://github.com/Amandabezsiv/crypto-dashboard.git
   cd crypto-dashboard/backend
   ```
#### Virtual Environment with uv
One of the best features of **uv** is how fast and easy it is to create virtual environments.

1. Create a virtual environment:
   ```bash
   uv venv
   ```
   This command sets up an isolated environment in seconds, ensuring project dependencies remain carefully separated.

2. Activate and synchronize the environment:
   ```bash
   uv sync
   ```
   The `uv sync` command aligns your virtual environment with the dependencies specified in the `pyproject.toml` file.

3. Run the Flask server:
   ```bash
   uv run python main.py
   ```
4. The backend will run at [http://localhost:5000](http://localhost:5000).

If needed, you can delete the `.venv` folder and recreate it quickly. You can also customize the environment name or specify the Python version:
   ```bash
   uv venv my-env --python 3.12.4
   ```


### Frontend (React)
1. Access the `frontend` folder and install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
2. Run the React project:
   ```bash
   npm start
   ```
3. The frontend will run at [http://localhost:3000](http://localhost:3000).

---

## 📅 Project Structure
```
crypto-dashboard/
├── backend/
│   ├── app/
│   │   ├── __init__.py     
│   │   └── crypto.py       
│   │      
│   └── main.py             
│       
├── frontend/
│   ├── src/
│   │   ├── components/     
│   │   ├── public/       
│   │   ├── App.js          
│   │   ├── index.css
│   │   └── index.js        
│   │ 
│   ├── pyproject.toml
│   └── package.json        
└── README.md               
```

---

## 📆 Future Improvements
- **OAuth Authentication** to manage user access.
- **Custom Filters** for monitoring specific coins.
- **Interactive Charts** with historical price variation data.
- **Notifications** to alert significant market changes.

---

## 💼 Contribution
Contributions are welcome! To contribute:
1. Fork the project.
2. Create a new branch:
   ```bash
   git checkout -b feature/new-feature
   ```
3. Submit your changes.
4. Open a **Pull Request**.

---

## ✨ Project Demo
![alt text](<Captura de ecrã de 2024-12-17 10-41-53.png>)

---

**Just a curious soul exploring the world ✨**

Developed with ❤ by [Amanda Bezerra da Silva](https://github.com/Amandabezsiv).
