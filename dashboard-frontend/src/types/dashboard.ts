export interface INewsItem {
  id: number;
  title: string;
  description: string;
  source: string;
  publishedAt: string;
  url: string;
}

export interface IDashboardData {
  news: INewsItem[];
  insight: string;
  meme: string;
}
