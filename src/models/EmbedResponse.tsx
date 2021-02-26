export interface EmbedReponse {
  title: string;
  author_name: string;
  author_url: string;
  width: number;
  height: number;
  thumbnail_width: number;
  thumbnail_height: number;
  thumbnail_url: string;
  web_page_short_url: string;
  license: string;
  html: string;
  version: string;
  provider_name: string;
  provider_url: string;
}

export interface FlickrEmbedReponse extends EmbedReponse {
  type: string;
  flickr_type: string;
  license_id: number;
  cache_age: number;
  url: string;
  web_page: string;
  web_page_short_url: string;
  license: string;
}

export interface VimeoEmbedReponse extends EmbedReponse {
  account_type: string;
  description: string;
  duration: number;
  is_plus: string;
  thumbnail_url_with_play_button: string;
  type: string;
  upload_date: string;
  uri: string;
  video_id: number;
}
