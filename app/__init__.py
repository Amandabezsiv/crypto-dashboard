from flask import Flask, jsonify
from flask_caching import Cache
from flask_socketio import SocketIO
from .crypto import get_crypto_data
import time

socketio = SocketIO()
cache = Cache()


def create_app():
    """
    Function to create and configure the Flask app.
    """
    app = Flask(__name__)
    app.config["CACHE_TYPE"] = "simple"
    app.config["CACHE_DEFAULT_TIMEOUT"] = 60

    cache.init_app(app)

    socketio.init_app(app, cors_allowed_origins="*")

    @app.route("/api/crypto", methods=["GET"])
    def crypto_data():
        """
        Endpoint to return cryptocurrency data.
        """
        try:

            data = get_crypto_data(cache)
            if data:
                return jsonify(data)
            else:
                return {"error": "Failed to fetch data"}, 500
        except Exception as e:

            return {"error": str(e)}, 500

    def stream_crypto_data():
        """
        Function that will be executed in a separate thread to issue data via WebSocket.
        """
        while True:
            data = get_crypto_data(cache)
            if data:
                socketio.emit("crypto_update", data)
            else:
                print("Erro ao obter dados de criptomoedas.")
            time.sleep(10)

    from threading import Thread

    thread = Thread(target=stream_crypto_data)
    thread.daemon = True
    thread.start()

    return app
