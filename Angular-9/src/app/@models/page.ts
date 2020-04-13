export interface Page {
  id: Number;
  title: string;
}

export interface PageContent {
  id: Number;
  title: string;
  pageId: number;
  page: string;
  subject: string;
  passage: string;
  image: any;
  imageUrl: string;
}
