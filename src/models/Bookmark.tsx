export class Bookmark {
  constructor(
    id: number | undefined,
    url: string,
    title: string,
    author_name: string,
    width: number,
    height: number,
    createdDate: string,
    type: BookmarkType,
    html: string,
    keywords: string[],
    thumbnail_url: string,
    duration?: number | undefined
  ) {
    this.id = id;
    this.url = url;
    this.title = title;
    this.author = author_name;
    this.width = width;
    this.height = height;
    this.createdDate = createdDate;
    this.type = type;
    this.html = html;
    this.keywords = keywords;
    this.thumbnail_url = thumbnail_url;
    this.duration = duration;
  }

  id: number | undefined;
  url: string;
  title: string;
  author: string | undefined;
  width: number;
  height: number;
  createdDate: string;
  type: BookmarkType;
  html: string;
  keywords: string[];
  duration?: number | undefined;
  thumbnail_url: string;
}

export enum BookmarkType {
  FLICKR = 'FLICKR',
  VIMEO = 'VIDEO',
}
