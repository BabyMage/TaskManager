import mysql.connector
from mysql.connector import pooling
from dotenv import load_dotenv
from pathlib import Path
import os

env_path = Path(__file__).resolve().parent.parent / ".env" # .parent DUAS vezes
load_dotenv(dotenv_path=env_path)

connection = None

try:
    connection = pooling.MySQLConnectionPool(
        pool_name = 'pool',
        pool_size = 5,
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        port = os.getenv("DB_PORT")
    )

except mysql.connector.Error as error:
    print(f"Erro ao iniciar conexão: {error}")


def get_connection():
    if connection is None:
        raise Exception("Erro na conexão")
    return connection.get_connection()