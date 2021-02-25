export class Bookmark {
  constructor(
    id: number,
    url: string,
    title: string,
    author: string,
    width: number,
    height: number,
    createdDate: string,
    type: BookmarkType
  ) {
    this.id = id;
    this.url = url;
    this.title = title;
    this.author = author;
    this.width = width;
    this.height = height;
    this.createdDate = createdDate;
    this.type = type;
  }

  id: number;
  url: string;
  title: string;
  author: string | undefined;
  width: number;
  height: number;
  createdDate: string;
  type: BookmarkType;
  duration?: number | undefined;
}

export enum BookmarkType {
  PHOTO = 'PHOTO',
  VIDEO = 'VIDEO',
}
