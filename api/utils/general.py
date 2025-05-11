import re


def validate_email(email):
    if not isinstance(email, str):
        return False, "Email must be a string"

    if not re.match(r"^.+@.+\..+$", email):
        return False, "Invalid email address"

    return True, None


def validate_password(password):
    if not isinstance(password, str):
        return False, "Password must be a string"

    if len(password) < 8:
        return False, "Password must be at least 8 characters long"

    if not re.search(r"[a-z]", password):
        return False, "Password must contain at least one lowercase letter"

    if not re.search(r"[A-Z]", password):
        return False, "Password must contain at least one uppercase letter"

    if not re.search(r"[0-9]", password):
        return False, "Password must contain at least one number"

    if not re.search(r"[^a-zA-Z0-9]", password):
        return False, "Password must contain at least one special character"

    return True, None
