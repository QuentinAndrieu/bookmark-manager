import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Store } from '@reduxjs/toolkit';
import React from 'react';
import { Button, Chip, Col, Row } from 'react-materialize';
import { Bookmark, BookmarkType } from '../models/Bookmark';
import { addBookmark, updateBookmark } from '../BookmarkSlice';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { BookmarkService } from '../BookmarkService';
import { FlickrEmbedReponse, VimeoEmbedReponse } from '../models/EmbedResponse';

export default class BookmarkForm extends React.Component<
  {
    isUpdate: boolean;
    bookmarkType: BookmarkType;
    bookmark?: Bookmark;
    store: Store;
    onSubmit: () => void;
  },
  {
    formBookmark: {
      url: string;
      width: number;
      height: number;
      keywords: string[];
    };
    keyword: string;
    disabledForm: boolean;
  }
> {
  constructor(props: { isUpdate: boolean; bookmarkType: BookmarkType; bookmark?: Bookmark; store: Store; onSubmit: () => void }) {
    super(props);

    this.state = {
      formBookmark: {
        url: this.props.bookmark?.url || '',
        width: this.props.bookmark?.width || 100,
        height: this.props.bookmark?.height || 100,
        keywords: this.props.bookmark?.keywords || [],
      },
      keyword: '',
      disabledForm: false,
    };

    this.handleChangeFormBookmark = this.handleChangeFormBookmark.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
    this.addKeyword = this.addKeyword.bind(this);
  }

  private handleChangeKeyword(event: any): void {
    this.setState({
      keyword: event.target.value,
    });
  }

  private handleChangeFormBookmark(event: any): void {
    const value = event.target.value;

    this.setState({
      formBookmark: { ...this.state.formBookmark, [event.target.name]: value },
    });
  }

  private handleSubmit(event: any): void {
    event.preventDefault();

    this.setState({ disabledForm: true });

    if (this.props.bookmarkType === BookmarkType.VIMEO) {
      this.fetchBookmarkVimeo().then((bookmark: Bookmark) => this.dispatchBookmark(bookmark));
    }

    if (this.props.bookmarkType === BookmarkType.FLICKR) {
      this.fetchBookmarkFlickr().then((bookmark: Bookmark) => this.dispatchBookmark(bookmark));
    }
  }

  private fetchBookmarkVimeo(): Promise<Bookmark> {
    return BookmarkService.fetchEmbedVimeo(this.state.formBookmark?.url, this.state.formBookmark?.width, this.state.formBookmark?.height).then(
      (vimeoEmbedResponse: VimeoEmbedReponse) => {
        const { author_name, title, width, height, html, thumbnail_url, duration } = vimeoEmbedResponse;

        return new Bookmark(
          this.props.bookmark?.id || Math.floor(Math.random() * 100000) + 1,
          this.state.formBookmark.url,
          title,
          author_name,
          width,
          height,
          new Date().toString(),
          BookmarkType.VIMEO,
          html,
          this.state.formBookmark.keywords,
          thumbnail_url,
          duration
        );
      }
    );
  }

  private fetchBookmarkFlickr(): Promise<Bookmark> {
    return BookmarkService.fetchEmbedFlickr(this.state.formBookmark?.url, this.state.formBookmark?.width, this.state.formBookmark?.height).then(
      (flickrEmbedReponse: FlickrEmbedReponse) => {
        const { author_name, title, width, height, url, html, thumbnail_url } = flickrEmbedReponse;

        return new Bookmark(
          this.props.bookmark?.id || Math.floor(Math.random() * 100000) + 1,
          this.state.formBookmark?.url,
          title,
          author_name,
          width,
          height,
          new Date().toString(),
          BookmarkType.FLICKR,
          html,
          this.state.formBookmark.keywords,
          thumbnail_url
        );
      }
    );
  }

  private dispatchBookmark(bookmark: Bookmark): void {
    if (this.props.isUpdate) {
      this.props.store.dispatch(updateBookmark(bookmark));
    } else {
      this.props.store.dispatch(addBookmark(bookmark));
    }

    this.setState({
      formBookmark: { url: '', height: 100, width: 100, keywords: [] },
      disabledForm: false,
    });

    this.props.onSubmit();
  }

  private addKeyword() {
    const keywords: string[] = [...this.state.formBookmark.keywords];
    keywords.push(this.state.keyword);

    this.setState({
      formBookmark: { ...this.state.formBookmark, keywords },
      keyword: '',
    });
  }

  private removeKeyword(index: number): void {
    let keywords: string[] = [...this.state.formBookmark.keywords];
    keywords.splice(index, 1);

    this.setState({
      formBookmark: { ...this.state.formBookmark, keywords },
    });
  }

  render() {
    const additionnalInputsVimeo =
      this.props.bookmarkType === BookmarkType.VIMEO ? (
        <div>
          <label>
            <strong>Width</strong>
            <input
              disabled={this.state.disabledForm}
              placeholder='Width'
              id='width'
              type='number'
              name='width'
              value={this.state.formBookmark?.width}
              onChange={this.handleChangeFormBookmark}
              required
            />
          </label>
          <label>
            <strong>Height</strong>
            <input
              disabled={this.state.disabledForm}
              placeholder='Height'
              type='number'
              id='height'
              name='height'
              value={this.state.formBookmark?.height}
              onChange={this.handleChangeFormBookmark}
              required
            />
          </label>
        </div>
      ) : null;

    return (
      <div className='BookmarkForm'>
        <form onSubmit={this.handleSubmit}>
          <Row>
            <Col s={12}>
              <label>
                <strong>URL</strong>
                <input
                  disabled={this.state.disabledForm}
                  placeholder='URL'
                  type='url'
                  id='url'
                  name='url'
                  value={this.state.formBookmark?.url}
                  onChange={this.handleChangeFormBookmark}
                  required
                />
              </label>

              {additionnalInputsVimeo}
            </Col>

            <Col s={7}>
              <label>
                <strong>Keywords</strong>
                <div style={{ marginTop: '15px' }}>
                  {this.state.formBookmark?.keywords.map((keyword: string, index: number) => {
                    return (
                      <Chip key={index}>
                        {keyword}
                        <FontAwesomeIcon
                          style={{ marginLeft: '5px' }}
                          icon={faTimes}
                          onClick={() => {
                            if (!this.state.disabledForm) {
                              this.removeKeyword(index);
                            }
                          }}
                        />
                      </Chip>
                    );
                  })}
                </div>
              </label>
            </Col>
            <Col s={4}>
              <label>
                <strong>Add new keyword</strong>
                <input
                  disabled={this.state.disabledForm}
                  placeholder='Add new keyword'
                  type='text'
                  id='keyWord'
                  name='keyWord'
                  value={this.state.keyword}
                  onChange={this.handleChangeKeyword}
                  minLength={3}
                />
              </label>
            </Col>
            <Col s={1}>
              <FontAwesomeIcon icon={faPlus} style={{ marginTop: '45px' }} onClick={this.addKeyword} />
            </Col>

            <Col s={12}>
              <Button waves='light' style={{ marginTop: '10px' }} disabled={this.state.disabledForm}>
                {this.props.isUpdate ? 'Update' : 'Add'}
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}
