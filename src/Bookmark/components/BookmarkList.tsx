import { Store } from '@reduxjs/toolkit';
import React from 'react';
import { Button, Col, Collection, CollectionItem, Row } from 'react-materialize';
import { Bookmark, BookmarkType, BookmarkTypeColor } from '../models/Bookmark';
import BookmarkForm from './BookmarkForm';
import Pagination from 'react-js-pagination';
import { CustomModal } from '../../shared/components/CustomModal';
import { BookmarkListItem } from './BookmarkListItem';

export default class BookmarkList extends React.Component<
  { bookmarks: Bookmark[]; store: Store },
  {
    isOpenModalForm: boolean;
    isOpenModalOverview: boolean;
    activePage: number;
    bookmarkFormModal: {
      bookmark: Bookmark | undefined;
      bookmarkType: BookmarkType;
      isUpdate: boolean;
      labelHeader: string;
    };
    bookmarkOverviewModal: {
      bookmark: Bookmark | undefined;
    };
    search: string;
  }
> {
  constructor(props: { bookmarks: Bookmark[]; store: Store }) {
    super(props);

    this.state = {
      isOpenModalForm: false,
      isOpenModalOverview: false,
      activePage: 1,
      bookmarkFormModal: {
        bookmark: undefined,
        bookmarkType: BookmarkType.FLICKR,
        isUpdate: false,
        labelHeader: '',
      },
      bookmarkOverviewModal: {
        bookmark: undefined,
      },
      search: '',
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.setStateOpenModalOverview = this.setStateOpenModalOverview.bind(this);
    this.openModalBookmarkOverview = this.openModalBookmarkOverview.bind(this);
    this.setStateOpenModalForm = this.setStateOpenModalForm.bind(this);
    this.openModalBookmarkForm = this.openModalBookmarkForm.bind(this);
  }

  private setStateOpenModalForm(isOpenModalForm: boolean): void {
    this.setState({ isOpenModalForm });
  }

  private setStateOpenModalOverview(isOpenModalOverview: boolean): void {
    this.setState({ isOpenModalOverview });
  }

  private handlePageChange(activePage: number): void {
    this.setState({ activePage });
  }

  private handleSearchChange(event: any): void {
    this.setState({
      search: event.target.value.toLowerCase(),
      activePage: 1,
    });
  }

  private openModalBookmarkForm(bookmark: Bookmark | undefined, bookmarkType: BookmarkType, isUpdate: boolean, labelHeader: string): void {
    this.setState({
      isOpenModalForm: true,
      bookmarkFormModal: {
        bookmark,
        bookmarkType,
        isUpdate,
        labelHeader,
      },
    });
  }

  private openModalBookmarkOverview(bookmark: Bookmark | undefined): void {
    this.setState({
      isOpenModalOverview: true,
      bookmarkOverviewModal: {
        bookmark,
      },
    });
  }

  render() {
    const bookmarksFilterBySearch: Bookmark[] = this.props.bookmarks.filter((bookmark: Bookmark) => {
      return (
        !this.state.search ||
        bookmark.title.toLowerCase().includes(this.state.search) ||
        bookmark.author?.toLowerCase().includes(this.state.search) ||
        bookmark.url?.toLowerCase().includes(this.state.search) ||
        bookmark.keywords.filter((keyword: string) => keyword.toLowerCase().includes(this.state.search)).length > 0
      );
    });
    const bookmarksFilterByPageAndSearch: Bookmark[] = bookmarksFilterBySearch.slice(this.state.activePage * 5 - 5, this.state.activePage * 5);

    return (
      <div className='BookmarkList'>
        <Row>
          <Col s={12}>
            <input placeholder='Search' id='search' type='text' name='search' onChange={this.handleSearchChange} required />
          </Col>
          <Col s={12}>
            <Collection header='Bookmarks' style={{ minHeight: '300px' }}>
              {bookmarksFilterByPageAndSearch.length > 0 ? (
                bookmarksFilterByPageAndSearch.map((bookmark: Bookmark, i) => {
                  return (
                    <BookmarkListItem
                      key={bookmark.id}
                      bookmark={bookmark}
                      store={this.props.store}
                      openModalBookmarkForm={this.openModalBookmarkForm}
                      openModalBookmarkOverview={this.openModalBookmarkOverview}
                    ></BookmarkListItem>
                  );
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
              totalItemsCount={bookmarksFilterBySearch.length + 1}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
          </Col>
          <Col s={12} style={{ textAlign: 'right', marginTop: '15px' }}>
            <Button
              style={{ marginRight: '10px', backgroundColor: BookmarkTypeColor.VIMEO }}
              onClick={() => this.openModalBookmarkForm(undefined, BookmarkType.VIMEO, false, 'Add video Vimeo')}
            >
              Add video Vimeo
            </Button>

            <Button
              style={{ marginRight: '10px', backgroundColor: BookmarkTypeColor.FLICKR }}
              onClick={() => this.openModalBookmarkForm(undefined, BookmarkType.FLICKR, false, 'Add photo Flickr')}
            >
              Add photo Flickr
            </Button>
          </Col>
        </Row>

        <CustomModal
          isOpen={this.state.isOpenModalForm}
          labelHeader={this.state.bookmarkFormModal.labelHeader}
          labelHeaderColor={BookmarkTypeColor[this.state.bookmarkFormModal.bookmarkType]}
          onClose={() => this.setStateOpenModalForm(false)}
        >
          <BookmarkForm
            bookmarkType={this.state.bookmarkFormModal.bookmarkType}
            isUpdate={this.state.bookmarkFormModal.isUpdate}
            bookmark={this.state.bookmarkFormModal.bookmark}
            store={this.props.store}
            onSubmit={() => this.setStateOpenModalForm(false)}
            onCancel={() => this.setStateOpenModalForm(false)}
          ></BookmarkForm>
        </CustomModal>

        <CustomModal
          isOpen={this.state.isOpenModalOverview}
          labelHeader={this.state.bookmarkOverviewModal.bookmark?.title || ''}
          labelHeaderColor={this.state.bookmarkOverviewModal?.bookmark?.type ? BookmarkTypeColor[this.state.bookmarkOverviewModal.bookmark.type] : 'black'}
          onClose={() => this.setStateOpenModalOverview(false)}
        >
          <div className='content' dangerouslySetInnerHTML={{ __html: this.state.bookmarkOverviewModal?.bookmark?.html || '' }}></div>
        </CustomModal>
      </div>
    );
  }
}
