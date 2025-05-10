import { Solver } from "@2captcha/captcha-solver";

export const solveRecaptchaV2 = async (
  pageurl: string,
  googlekey: string,
  data_s: string
) => {
  try {
    const solver = new Solver(process.env["2CAPTCHA_API_KEY"]);
    const result = await solver.recaptcha({
      pageurl: pageurl,
      googlekey: googlekey,
      datas: data_s,
    });
    return {
      data: result,
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
