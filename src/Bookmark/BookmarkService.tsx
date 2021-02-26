import { FlickrEmbedReponse, VimeoEmbedReponse } from './models/EmbedResponse';

export class BookmarkService {
  static fetchEmbedVimeo(url: string, width: number, height: number): Promise<VimeoEmbedReponse> {
    return fetch(`https://vimeo.com/api/oembed.json?url=${url.replace('https://', 'https%3A//')}&width=${width}&height=${height}`).then((res) => res.json());
  }

  static fetchEmbedFlickr(url: string, width: number, height: number): Promise<FlickrEmbedReponse> {
    // Prefix url with https://cors-anywhere.herokuapp.com/ to bypass the CORS restriction. Not viable in production environnement
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://www.flickr.com/services/oembed/?format=json&url=${url.replace('https://', 'http%3A//')}}&width=${width}&height=${height}`
    ).then((res) => res.json());
  }
}
