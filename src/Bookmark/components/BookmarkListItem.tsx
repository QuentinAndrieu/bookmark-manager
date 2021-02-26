import { faCameraRetro, faPen, faTrash, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Store } from '@reduxjs/toolkit';
import { Chip, Col, CollectionItem, Row } from 'react-materialize';
import { Bookmark, BookmarkType } from '../models/Bookmark';
import React from 'react';
import { deleteBookmark } from '../BookmarkSlice';
import dayjs from 'dayjs';

export class BookmarkListItem extends React.Component<
  {
    bookmark: Bookmark;
    store: Store;
    openModalBookmarkForm: (bookmark: Bookmark, bookmarkType: BookmarkType, isUpdate: true, labelHeader: string) => void;
  },
  {}
> {
  constructor(props: { bookmark: Bookmark; store: Store; openModalBookmarkForm: (bookmark: Bookmark, bookmarkType: BookmarkType, isUpdate: true, labelHeader: string) => void }) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <CollectionItem key={this.props.bookmark.id}>
        <Row>
          <Col s={1}>
            <img src={this.props.bookmark.thumbnail_url} alt='Logo' width='100%' style={{ marginTop: '20px' }} />
          </Col>
          <Col s={10}>
            <h5>
              <FontAwesomeIcon
                icon={this.props.bookmark.type === BookmarkType.FLICKR ? faCameraRetro : faVideo}
                style={{ marginRight: '10px' }}
                color='grey'
                onClick={() => this.props.openModalBookmarkForm(this.props.bookmark, this.props.bookmark.type, true, `Update bookmark : ${this.props.bookmark.url}`)}
              />
              {this.props.bookmark.title} (<a href={this.props.bookmark.url}>{this.props.bookmark.url}</a>)
            </h5>

            <Row>
              <Col s={3}>
                <strong>Author: </strong>
                {this.props.bookmark.author}
              </Col>

              <Col s={2}>
                <strong>Width: </strong>
                {this.props.bookmark.width}
              </Col>

              <Col s={2}>
                <strong>Height: </strong>
                {this.props.bookmark.height}
              </Col>

              <Col s={5}>
                <strong>Created date: </strong>
                {dayjs(this.props.bookmark.createdDate).format('MM/DD/YYYY')}
              </Col>

              <Col s={12} style={{ marginTop: '20px' }}>
                {this.props.bookmark.keywords.map((keyword: string, index: number) => {
                  return <Chip key={index}>{keyword}</Chip>;
                })}
              </Col>
            </Row>
          </Col>

          <Col s={1}>
            <FontAwesomeIcon
              icon={faPen}
              style={{ marginRight: '20px' }}
              color='grey'
              onClick={() => this.props.openModalBookmarkForm(this.props.bookmark, this.props.bookmark.type, true, `Update bookmark : ${this.props.bookmark.url}`)}
            />
            <FontAwesomeIcon
              icon={faTrash}
              color='grey'
              onClick={() => {
                if (this.props.bookmark.id) {
                  this.props.store.dispatch(deleteBookmark(this.props.bookmark.id));
                }
              }}
            />
          </Col>
        </Row>
      </CollectionItem>
    );
  }
}
