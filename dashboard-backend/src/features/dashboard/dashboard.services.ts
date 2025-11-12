import axios from "axios";

export interface ICoinLite {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number | null;
  market_cap_rank: number;
}
  const SUBREDDITS = [
    "cryptomemes",
    "cryptocurrency",
    "bitcoinmemes",
    "CryptoMoonShots",
  ];

export class DashboardService {
  static async getNews() {
    try {
      const apiKey = process.env.CRYPTOPANIC_API_KEY;

      if (!apiKey) {
        throw new Error("CRYPTOPANIC_API_KEY not configured");
      }

      const url = "https://cryptopanic.com/api/v1/posts/";
      console.log("Fetching news from CryptoPanic...");

      const { data } = await axios.get(url, {
        params: {
          auth_token: apiKey,
          public: true,
          kind: 'news',
          filter: 'hot'
        }
      });

      console.log(`Successfully fetched ${data.results?.length || 0} news items`);

      return data.results.slice(0, 10).map((post: any, index: number) => {
        // Construct URL if not provided, using slug
        const postUrl = post.url || `https://cryptopanic.com/news/${post.id}/${post.slug}`;
        return {
          id: index + 1,
          title: post.title,
          description: post.description || '',
          source: post.source?.title || 'CryptoPanic',
          publishedAt: post.published_at,
          url: postUrl
        };
      });
    } catch (error: any) {
      console.error("Error fetching news from CryptoPanic:", error.response?.data || error.message);
      throw new Error(`Failed to fetch news: ${error.response?.data?.message || error.message}`);
    }
  }

  static async getCoinPrices() {
    const url = `${process.env.COINGECKO_API}/coins/markets`;

    const { data } = await axios.get(url, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: false
      }
    });

    return data;
  }

  static async getTopCoins(limit = 6, vs = process.env.COINGECKO_VS || "usd"): Promise<ICoinLite[]> {
    const base = process.env.COINGECKO_API!;
    const url = `${base}/coins/markets?vs_currency=${vs}&per_page=${limit}&page=1&order=market_cap_desc&sparkline=false`;
    const { data } = await axios.get(url, {
      timeout: 10_000,
      headers: { "Accept": "application/json" }
    });

    return data.map((c: any) => ({
      id: c.id,
      name: c.name,
      symbol: c.symbol?.toUpperCase(),
      image: c.image,
      current_price: c.current_price,
      price_change_percentage_24h: c.price_change_percentage_24h ?? null,
      market_cap_rank: c.market_cap_rank
    }));
  }

  static async getRandomMeme() {
    try {
      // Pick a random subreddit
      const subreddit = SUBREDDITS[Math.floor(Math.random() * SUBREDDITS.length)];

      // Reddit JSON endpoint (no auth needed)
      const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=50`;
      const { data } = await axios.get(url, { headers: { "User-Agent": "CryptoDashBot/1.0" } });

      // Filter posts that have preview images
      const posts = data?.data?.children
        ?.map((c: any) => c.data)
        ?.filter((p: any) => p?.preview?.images?.length && !p.over_18);

      if (!posts?.length) throw new Error("No meme found");

      // Pick a random meme
      const post = posts[Math.floor(Math.random() * posts.length)];
      const image = post.preview.images[0].source.url.replace(/&amp;/g, "&");

      return {
        title: post.title,
        image,
        subreddit,
        postUrl: `https://reddit.com${post.permalink}`,
      };
    } catch (err) {
      console.error("Reddit meme fetch failed:", (err as any).message);
      // Fallback static meme
      return {
        title: "When your portfolio finally turns green",
        image: "https://i.imgflip.com/4t0m5.jpg",
        subreddit: "fallback",
        postUrl: "https://reddit.com/r/cryptomemes",
      };
    }
  }


}