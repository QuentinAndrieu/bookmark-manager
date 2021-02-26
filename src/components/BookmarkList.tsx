import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Store } from '@reduxjs/toolkit';
import React from 'react';
import { Button, Chip, Col, Collection, CollectionItem, Row } from 'react-materialize';
import { Bookmark, BookmarkType } from '../models/Bookmark';
import { deleteBookmark } from '../store/Bookmark/BookmarkSlice';
import { faPen, faTrash, faCameraRetro, faVideo } from '@fortawesome/free-solid-svg-icons';
import BookmarkForm from './BookmarkForm';
import Pagination from 'react-js-pagination';
import { CustomModal } from '../shared/CustomModal';
import dayjs from 'dayjs';

export default class BookmarkList extends React.Component<
  { bookmarks: Bookmark[]; store: Store },
  {
    isOpenModal: boolean;
    activePage: number;
    bookmarkModal: {
      bookmark: Bookmark | undefined;
      bookmarkType: BookmarkType;
      isUpdate: boolean;
      labelHeader: string;
    };
  }
> {
  constructor(props: { bookmarks: Bookmark[]; store: Store }) {
    super(props);

    this.state = {
      isOpenModal: false,
      activePage: 1,
      bookmarkModal: {
        bookmark: undefined,
        bookmarkType: BookmarkType.FLICKR,
        isUpdate: false,
        labelHeader: '',
      },
    };

    this.setStateOpenModal = this.setStateOpenModal.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.openModalBookmarkForm = this.openModalBookmarkForm.bind(this);
  }

  private setStateOpenModal(isOpenModal: boolean) {
    this.setState({ isOpenModal });
  }

  private handlePageChange(pageNumber: number) {
    this.setState({ activePage: pageNumber });
  }

  private openModalBookmarkForm(bookmark: Bookmark | undefined, bookmarkType: BookmarkType, isUpdate: boolean, labelHeader: string) {
    this.setState({
      isOpenModal: true,
      bookmarkModal: {
        bookmark,
        bookmarkType,
        isUpdate,
        labelHeader,
      },
    });
  }

  render() {
    const bookmarksFilterByPage: Bookmark[] = this.props.bookmarks.slice(this.state.activePage * 5 - 5, this.state.activePage * 5);

    return (
      <div className='BookmarkList'>
        <Row>
          <Col s={12}>
            <Collection header='Bookmarks' style={{ minHeight: '300px' }}>
              {bookmarksFilterByPage.length > 0 ? (
                bookmarksFilterByPage.map((bookmark: Bookmark, i) => {
                  return <BookmarkListItem key={bookmark.id} bookmark={bookmark} store={this.props.store} openModalBookmarkForm={this.openModalBookmarkForm}></BookmarkListItem>;
                })
              ) : (
                <CollectionItem key='no-data' style={{ textAlign: 'center' }}>
                  <strong>No data</strong>
                </CollectionItem>
              )}
            </Collection>
          </Col>
          <Col s={12} style={{ textAlign: 'center' }}>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={5}
              totalItemsCount={this.props.bookmarks.length + 1}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange.bind(this)}
            />
          </Col>
          <Col s={12}>
            <Button style={{ marginRight: '10px' }} onClick={() => this.openModalBookmarkForm(undefined, BookmarkType.VIMEO, false, 'Add video Vimeo')}>
              Add video Vimeo
            </Button>

            <Button onClick={() => this.openModalBookmarkForm(undefined, BookmarkType.FLICKR, false, 'Add photo Flickr')}>Add photo Flickr</Button>
          </Col>
        </Row>

        <CustomModal isOpen={this.state.isOpenModal} labelHeader={this.state.bookmarkModal.labelHeader} onClose={() => this.setStateOpenModal(false)}>
          <BookmarkForm
            bookmarkType={this.state.bookmarkModal.bookmarkType}
            isUpdate={this.state.bookmarkModal.isUpdate}
            bookmark={this.state.bookmarkModal.bookmark}
            store={this.props.store}
            onSubmit={() => this.setStateOpenModal(false)}
          ></BookmarkForm>
        </CustomModal>
      </div>
    );
  }
}

class BookmarkListItem extends React.Component<
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
