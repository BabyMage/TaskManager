import mysql.connector
import os
from pathlib import Path

cert_path = Path(__file__).resolve().parent / "Certs" / "ca.pem"

connection = None
cursor = None

try:
    connection = mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        port=int(os.getenv("DB_PORT")),
        ssl_ca=str(cert_path),
        ssl_verify_cert=True,
        ssl_verify_identity=True
    )

    cursor = connection.cursor()

    
    cursor.execute("SHOW TABLES")


    
    for table in cursor.fetchall():
        print(table[0])

except mysql.connector.Error as error:
    print(f"Erro ao executar operação: {error}")

finally:
    if cursor:
        cursor.close()

    if connection and connection.is_connected():
        connection.close()