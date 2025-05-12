from twocaptcha import TwoCaptcha
import os

solver = TwoCaptcha(os.getenv("2CAPTCHA_API_KEY"))


def solve_recaptcha2(url, sitekey, data_s):
    result = solver.recaptcha(url, sitekey, data_s)
    return result
