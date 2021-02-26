import { Store } from '@reduxjs/toolkit';
import React from 'react';
import { Button, Col, Collection, CollectionItem, Row } from 'react-materialize';
import { Bookmark, BookmarkType } from '../models/Bookmark';
import BookmarkForm from './BookmarkForm';
import Pagination from 'react-js-pagination';
import { CustomModal } from '../../shared/components/CustomModal';
import { BookmarkListItem } from './BookmarkListItem';

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

  private setStateOpenModal(isOpenModal: boolean): void {
    this.setState({ isOpenModal });
  }

  private handlePageChange(pageNumber: number): void {
    this.setState({ activePage: pageNumber });
  }

  private openModalBookmarkForm(bookmark: Bookmark | undefined, bookmarkType: BookmarkType, isUpdate: boolean, labelHeader: string): void {
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
