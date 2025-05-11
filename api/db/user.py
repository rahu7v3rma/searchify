import psycopg
import os


def create_user(email, password):
    with psycopg.connect(os.getenv("POSTGRES_URI")) as conn:
        with conn.cursor() as cursor:
            cursor.execute(
                "INSERT INTO users (email, password) VALUES (%s, %s)", (email, password)
            )
            conn.commit()


def find_user_by_email(email):
    with psycopg.connect(os.getenv("POSTGRES_URI")) as conn:
        with conn.cursor(row_factory=psycopg.rows.dict_row) as cursor:
            cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
            return cursor.fetchone()


def update_user_email_verification_code(id, email_verification_code):
    with psycopg.connect(os.getenv("POSTGRES_URI")) as conn:
        with conn.cursor() as cursor:
            cursor.execute(
                "UPDATE users SET email_verification_code = %s WHERE id = %s",
                (email_verification_code, id),
            )
            conn.commit()


def update_user_password(id, password):
    with psycopg.connect(os.getenv("POSTGRES_URI")) as conn:
        with conn.cursor() as cursor:
            cursor.execute(
                "UPDATE users SET password = %s WHERE id = %s", (password, id)
            )
            conn.commit()


def find_user_by_id(id):
    with psycopg.connect(os.getenv("POSTGRES_URI")) as conn:
        with conn.cursor(row_factory=psycopg.rows.dict_row) as cursor:
            cursor.execute("SELECT * FROM users WHERE id = %s", (id,))
            return cursor.fetchone()


def update_user_access_token(id, access_token):
    with psycopg.connect(os.getenv("POSTGRES_URI")) as conn:
        with conn.cursor() as cursor:
            cursor.execute(
                "UPDATE users SET access_token = %s WHERE id = %s", (access_token, id)
            )
            conn.commit()

"""
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    email_verification_code TEXT
);
ALTER TABLE users ADD COLUMN access_token TEXT;
"""
