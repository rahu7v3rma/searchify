import { Browser, Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { solveRecaptchaV2 } from "./2captcha";
import { By, until } from "selenium-webdriver";

const service = new chrome.ServiceBuilder(
  process.cwd() + "/assets/selenium/chromedriver"
);

export async function getGoogleAutocompleteSuggestions(
  keyword: string,
  uule: string
) {
  console.log(process.cwd() + "/assets/selenium/chromedriver");
  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeService(service)
    .build();
  try {
    const pageUrl = `https://www.google.com/search?q=${keyword}&uule=${uule}`;

    await driver.get(pageUrl);

    const hasCaptchaForm = await driver.findElement(By.id("captcha-form"));

    console.log(!!hasCaptchaForm, "hasCaptchaForm");

    if (hasCaptchaForm) {
      const googleSiteKey = await driver
        .findElement(By.css("[data-sitekey]"))
        .getAttribute("data-sitekey");

      const data_s = await driver
        .findElement(By.css(".g-recaptcha"))
        .getAttribute("data-s");

      console.log(googleSiteKey, "googleSiteKey");
      console.log(data_s, "data_s");

      const result = await solveRecaptchaV2(pageUrl, googleSiteKey, data_s);

      const token = result.data.data;

      if (token) {
        await driver.executeScript(
          `
            document.getElementById('g-recaptcha-response').innerHTML = arguments[0];
            document.getElementById('g-recaptcha-response').style.display = 'block';
            `,
          token
        );

        await driver.executeScript(
          `document.getElementById('captcha-form').submit();`
        );

        await driver.wait(until.stalenessOf(hasCaptchaForm), 10000);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 50000000));
  } catch (error) {
    console.error(error);
    return { error };
  } finally {
    await driver.quit();
  }
}
