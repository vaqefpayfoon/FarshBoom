export interface Page {
  id: number;
  title: string;
}

export interface PageContent {
  id: number;
  title: string;
  pageId: number;
  page: string;
  subject: string;
  passage: string;
  image: any;
  imageUrl: string;
}
