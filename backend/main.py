from app import create_app, socketio, cache
import threading
import time
from app.crypto import get_crypto_data
from flask_cors import CORS

# Criação do app
app = create_app()
CORS(app)


# Função para emitir dados em tempo real via WebSocket
def stream_crypto_data():
    while True:
        try:
            # Chama a função get_crypto_data para pegar dados do cache ou API
            data = get_crypto_data(cache)
            if data:
                socketio.emit(
                    "crypto_update", data
                )  # Envia os dados para o frontend via WebSocket
            else:
                print("Erro ao obter dados de criptomoedas.")
        except Exception as e:
            print(f"Erro na thread de stream: {e}")

        # Aguarda 10 segundos antes de tentar pegar os dados novamente
        time.sleep(10)  # O intervalo pode ser ajustado conforme necessário


if __name__ == "__main__":
    # Inicia a thread para emitir dados em tempo real
    thread = threading.Thread(target=stream_crypto_data)
    thread.daemon = True  # Garante que a thread será encerrada quando o app parar
    thread.start()

    # Roda o app Flask com WebSocket
    socketio.run(app, debug=True)
