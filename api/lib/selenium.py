from lib.openvpn import openvpn_connection
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from lib.twocaptcha import solve_recaptcha2


def get_keywords(keyword, uule, openvpn_config):
    print("get_keywords", keyword, uule, openvpn_config)

    driver = None
    try:
        keywords = {
            "autocomplete": [],
        }
        with openvpn_connection(openvpn_config):
            driver = webdriver.Chrome()
            driver.get(f"https://www.google.com/search?q={keyword}&uule={uule}")

            captcha_form = driver.find_element(By.ID, "captcha-form")
            print("captcha_form", bool(captcha_form))
            if captcha_form:
                sitekey = captcha_form.find_element(
                    By.CSS_SELECTOR, "[data-sitekey]"
                ).get_attribute("data-sitekey")
                print("sitekey", sitekey)

                data_s = captcha_form.find_element(
                    By.CSS_SELECTOR, ".g-recaptcha"
                ).get_attribute("data-s")
                print("data_s", data_s)

                captcha_result = solve_recaptcha2(
                    "https://www.google.com/recaptcha/api2/demo",
                    sitekey,
                    data_s
                )
                print("captcha_result", captcha_result)
                captcha_token = captcha_result["code"]
                print("captcha_token", captcha_token)

                driver.execute(
                    '''
                        document.getElementById('g-recaptcha-response').innerHTML = arguments[0];
                        document.getElementById('g-recaptcha-response').style.display = 'block';
                        document.getElementById('captcha-form').submit();
                    ''',
                    captcha_token
                )

                WebDriverWait(driver, 1000).until(
                    EC.presence_of_element_located((By.ID, "captcha-form"))
                )

            driver.quit()
            return keywords
    except Exception as e:
        print("error get keywords", e)
        return [{"autocomplete": []}]
    finally:
        driver.quit()
