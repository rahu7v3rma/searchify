// @ts-nocheck
import dotenv from "dotenv";
import { GoogleAdsApi, services } from "google-ads-api";

dotenv.config();

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
});

const customer = client.Customer({
  customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID,
  login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
});

export const getKeywordIdeas = async (
  keyword: string,
  criteriaId = "1023191",
  pageSize = 10
) => {
  const locationIds = [criteriaId];
  const languageId = "1000";

  const keywordSeed = new services.KeywordSeed({ keywords: [keyword] });

  const generateKeywordIdeaResponse =
    await customer.keywordPlanIdeas.generateKeywordIdeas({
      customer_id: customer.credentials.customer_id,
      page_size: pageSize,
      keyword_seed: keywordSeed,
      geo_target_constants: locationIds.map((id) => `geoTargetConstants/${id}`),
      language: `languageConstants/${languageId}`,
      include_adult_keywords: false,
    });

  return generateKeywordIdeaResponse.map((idea) => ({
    keyword: idea.text,
    avgMonthlySearches: idea.keyword_idea_metrics.avg_monthly_searches,
    competition: idea.keyword_idea_metrics.competition,
  }));
};
