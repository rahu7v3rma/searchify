import { NextRequest, NextResponse } from "next/server";
// import { getKeywordIdeas } from "../../../lib/googleAds";
import { getGoogleAutocompleteSuggestions } from "../../../lib/selenium";

export async function POST(request: NextRequest) {
  try {
    let { keyword, geotargetCreteriaId } = await request.json();
    keyword = String(keyword);
    geotargetCreteriaId = String(geotargetCreteriaId);

    if (!keyword || !geotargetCreteriaId) {
      return NextResponse.json(
        { error: "Missing keyword or geotargetCreteriaId" },
        { status: 400 }
      );
    }

    // const getKeywordIdeasFromGoogleAds = await getKeywordIdeas(
    //   keyword,
    //   geotargetCreteriaId
    // );

    const uule = "w+CAIQICIfTmV3IFlvcmssTmV3IFlvcmssVW5pdGVkIFN0YXRlcw==";

    const googleAutocompleteSuggestions =
      await getGoogleAutocompleteSuggestions(keyword, uule);

    console.log(googleAutocompleteSuggestions);

    return NextResponse.json(
      {
        data: [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
