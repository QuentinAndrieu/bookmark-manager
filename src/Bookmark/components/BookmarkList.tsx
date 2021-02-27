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
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.setStateOpenModalOverview = this.setStateOpenModalOverview.bind(this);
    this.openModalBookmarkOverview = this.openModalBookmarkOverview.bind(this);
    this.setStateOpenModalForm = this.setStateOpenModalForm.bind(this);
    this.openModalBookmarkForm = this.openModalBookmarkForm.bind(this);
  }

  private setStateOpenModalForm(isOpenModal: boolean): void {
    this.setState({ isOpenModalForm: isOpenModal });
  }

  private setStateOpenModalOverview(isOpenModal: boolean): void {
    this.setState({ isOpenModalOverview: isOpenModal });
  }

  private handlePageChange(pageNumber: number): void {
    this.setState({ activePage: pageNumber });
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
    const bookmarksFilterByPage: Bookmark[] = this.props.bookmarks.slice(this.state.activePage * 5 - 5, this.state.activePage * 5);

    return (
      <div className='BookmarkList'>
        <Row>
          <Col s={12}>
            <Collection header='Bookmarks' style={{ minHeight: '300px' }}>
              {bookmarksFilterByPage.length > 0 ? (
                bookmarksFilterByPage.map((bookmark: Bookmark, i) => {
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
              totalItemsCount={this.props.bookmarks.length + 1}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange.bind(this)}
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
