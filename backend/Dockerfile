# Usar imagem base do Python 3.12 slim
FROM python:3.13

# Instalar o UV a partir do repositório
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Definir o diretório de trabalho para o aplicativo
WORKDIR /app

# Copiar o código do projeto (backend e main.py) para dentro da imagem
COPY . /app

# Instalar dependências usando o UV (a partir do pyproject.toml)
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --frozen --no-install-project

# Sincronizar o projeto usando o UV
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync 

# Instalar o Gunicorn
RUN uv pip install gunicorn

# Comando para rodar o servidor Flask com Gunicorn, ajustado para o arquivo main.py
CMD ["uv", "run", "gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "main:app"]

