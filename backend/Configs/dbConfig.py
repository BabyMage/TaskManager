import mysql.connector
from mysql.connector import pooling
from pathlib import Path
import os


cert_path = Path(__file__).resolve().parent.parent / "Certs" / "ca.pem"

pool = None

try:
    pool = pooling.MySQLConnectionPool(
        pool_name="pool",
        pool_size=5,
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        port=int(os.getenv("DB_PORT", "3306")),

        ssl_ca=str(cert_path),
        ssl_verify_cert=True,
        ssl_verify_identity=True
    )

except mysql.connector.Error as error:
    print(f"Erro ao iniciar conexão: {error}")


def get_connection():
    if pool is None:
        raise Exception("Erro na conexão")

    return pool.get_connection()