export interface Content {
  id: number;
  title: string;
  type: 'text' | 'video';
  content?: string;
  url?: string;
}
