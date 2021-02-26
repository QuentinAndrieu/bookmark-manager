export class BookmarkService {
  static fetchEmbedVimeo(url: string, width: number, height: number): Promise<any> {
    return fetch(`https://vimeo.com/api/oembed.json?url=${url.replace('https://', 'https%3A//')}&width=${width}&height=${height}`).then((res) => res.json());
  }

  static fetchEmbedFlickr(url: string, width: number, height: number): Promise<any> {
    return fetch(`https://www.flickr.com/services/oembed/?format=json&url=${url.replace('https://', 'http%3A//')}}&width=${width}&height=${height}`).then((res) => res.json());
  }
}
