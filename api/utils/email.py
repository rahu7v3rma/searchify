import os
import smtplib
from email.message import EmailMessage


def send_email(to_email, subject, message):
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = os.getenv("EMAIL_USER")
    msg["To"] = to_email
    msg.set_content(message)

    with smtplib.SMTP_SSL(
        os.getenv("EMAIL_HOST"), int(os.getenv("EMAIL_PORT"))
    ) as smtp:
        smtp.login(os.getenv("EMAIL_USER"), os.getenv("EMAIL_PASSWORD"))
        smtp.send_message(msg)
