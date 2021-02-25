import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Store } from '@reduxjs/toolkit';
import React from 'react';
import { Col, Collection, CollectionItem, Row } from 'react-materialize';
import { Bookmark } from '../models/Bookmark';
import { deleteBookmark } from '../store/Bookmark/BookmarkSlice';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

export default class BookmarkList extends React.Component<
  { bookmarks: Bookmark[]; store: Store },
  {}
> {
  constructor(props: { bookmarks: Bookmark[]; store: Store }) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className='BookmarkList'>
        <Row>
          <Col s={12}>
            <Collection header='Bookmarks'>
              {this.props.bookmarks.map((bookmark: Bookmark, i) => {
                return (
                  <CollectionItem key={bookmark.id}>
                    {bookmark.url}
                    <a className='secondary-content'>
                      <FontAwesomeIcon icon={faPen} />
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() =>
                          this.props.store.dispatch(deleteBookmark(bookmark.id))
                        }
                      />
                    </a>
                  </CollectionItem>
                );
              })}
            </Collection>
          </Col>
        </Row>
      </div>
    );
  }
}
