import { faCameraRetro, faPen, faTrash, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Store } from '@reduxjs/toolkit';
import { Chip, Col, CollectionItem, Row } from 'react-materialize';
import { Bookmark, BookmarkType, BookmarkTypeColor } from '../models/Bookmark';
import React from 'react';
import { deleteBookmark } from '../BookmarkSlice';
import dayjs from 'dayjs';

export class BookmarkListItem extends React.Component<
  {
    bookmark: Bookmark;
    store: Store;
    openModalBookmarkForm: (bookmark: Bookmark, bookmarkType: BookmarkType, isUpdate: true, labelHeader: string) => void;
    openModalBookmarkOverview: (bookmark: Bookmark) => void;
  },
  {}
> {
  constructor(props: {
    bookmark: Bookmark;
    store: Store;
    openModalBookmarkForm: (bookmark: Bookmark, bookmarkType: BookmarkType, isUpdate: true, labelHeader: string) => void;
    openModalBookmarkOverview: (bookmark: Bookmark) => void;
  }) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <CollectionItem key={this.props.bookmark.id}>
        <Row>
          <Col s={12} m={12} l={3} xl={2}>
            <img
              onClick={() => this.props.openModalBookmarkOverview(this.props.bookmark)}
              src={this.props.bookmark.thumbnail_url}
              alt='Logo'
              width='100%'
              style={{ marginTop: '20px', cursor: 'pointer' }}
            />
          </Col>
          <Col s={12} m={12} l={8} xl={9}>
            <h5 style={{ color: BookmarkTypeColor[this.props.bookmark.type] }}>
              <FontAwesomeIcon icon={this.props.bookmark.type === BookmarkType.FLICKR ? faCameraRetro : faVideo} style={{ marginRight: '10px' }} />
              {this.props.bookmark.title} (<a href={this.props.bookmark.url}>{this.props.bookmark.url}</a>)
            </h5>
            <strong>By {this.props.bookmark.author}</strong> | {this.props.bookmark.width}w / {this.props.bookmark.height}h
            <span style={{ marginLeft: '10px' }}>
              {this.props.bookmark.keywords.map((keyword: string, index: number) => {
                return <Chip key={index}>{keyword}</Chip>;
              })}
            </span>
          </Col>

          <Col s={12} m={12} l={1} xl={1} style={{ textAlign: 'right' }}>
            <FontAwesomeIcon
              icon={faPen}
              style={{ marginRight: '20px' }}
              color={BookmarkTypeColor[this.props.bookmark.type]}
              onClick={() => this.props.openModalBookmarkForm(this.props.bookmark, this.props.bookmark.type, true, `Update bookmark : ${this.props.bookmark.title}`)}
            />
            <FontAwesomeIcon
              icon={faTrash}
              color={BookmarkTypeColor[this.props.bookmark.type]}
              onClick={() => {
                if (this.props.bookmark.id) {
                  this.props.store.dispatch(deleteBookmark(this.props.bookmark.id));
                }
              }}
            />
          </Col>
          <Col s={12} m={12} style={{ textAlign: 'right', marginTop: '10px' }}>
            <strong>{dayjs(this.props.bookmark.createdDate).format('MM/DD/YYYY')}</strong>
          </Col>
        </Row>
      </CollectionItem>
    );
  }
}
