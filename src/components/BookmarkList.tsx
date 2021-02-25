import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Store } from '@reduxjs/toolkit';
import React from 'react';
import { Col, Collection, CollectionItem, Row } from 'react-materialize';
import { Bookmark, BookmarkType } from '../models/Bookmark';
import { deleteBookmark } from '../store/Bookmark/BookmarkSlice';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import ButtonModal from '../shared/ButtonModal';
import BookmarkForm from './BookmarkForm';
import Pagination from 'react-js-pagination';

export default class BookmarkList extends React.Component<
  { bookmarks: Bookmark[]; store: Store },
  {
    isOpenModalVideo: boolean;
    isOpenModalPhoto: boolean;
    numberPages: number;
    activePage: number;
  }
> {
  constructor(props: { bookmarks: Bookmark[]; store: Store }) {
    super(props);

    this.state = {
      isOpenModalVideo: false,
      isOpenModalPhoto: false,
      numberPages: 1,
      activePage: 1,
    };

    this.setStateOpenModalPhoto = this.setStateOpenModalPhoto.bind(this);
    this.setStateOpenModalVideo = this.setStateOpenModalVideo.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidUpdate(nextProps: any) {
    const { bookmarks } = this.props;

    if (JSON.stringify(nextProps.bookmarks) !== JSON.stringify(bookmarks)) {
      this.setState({
        numberPages: Math.floor(1 + this.props.bookmarks.length / 5),
      });
    }
  }

  setStateOpenModalPhoto(isOpenModalPhoto: boolean) {
    this.setState({ isOpenModalPhoto });
  }

  setStateOpenModalVideo(isOpenModalVideo: boolean) {
    this.setState({ isOpenModalVideo });
  }

  handlePageChange(pageNumber: number) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  render() {
    return (
      <div className='BookmarkList'>
        <Row>
          <Col s={12}>
            <Collection header='Bookmarks'>
              {this.props.bookmarks
                .slice(this.state.activePage * 5 - 5, this.state.activePage * 5)
                .map((bookmark: Bookmark, i) => {
                  return (
                    <CollectionItem key={bookmark.id}>
                      {bookmark.url}
                      <a className='secondary-content'>
                        <FontAwesomeIcon
                          icon={faPen}
                          style={{ marginRight: '10px' }}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() =>
                            this.props.store.dispatch(
                              deleteBookmark(bookmark.id)
                            )
                          }
                        />
                      </a>
                    </CollectionItem>
                  );
                })}
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
            <span style={{ marginRight: '10px' }}>
              <ButtonModal
                labelButton='Add video'
                labelHeader='Add video'
                isOpen={this.state.isOpenModalVideo}
                onClose={() => this.setStateOpenModalVideo(false)}
                onOpen={() => this.setStateOpenModalVideo(true)}
              >
                <BookmarkForm
                  bookmarkType={BookmarkType.VIDEO}
                  isUpdate={false}
                  store={this.props.store}
                  onSubmit={() => this.setStateOpenModalVideo(false)}
                ></BookmarkForm>
              </ButtonModal>
            </span>

            <span>
              <ButtonModal
                labelButton='Add photo'
                labelHeader='Add photo'
                isOpen={this.state.isOpenModalPhoto}
                onClose={() => this.setStateOpenModalPhoto(false)}
                onOpen={() => this.setStateOpenModalPhoto(true)}
              >
                <BookmarkForm
                  bookmarkType={BookmarkType.PHOTO}
                  isUpdate={false}
                  store={this.props.store}
                  onSubmit={() => this.setStateOpenModalPhoto(false)}
                ></BookmarkForm>
              </ButtonModal>
            </span>
          </Col>
        </Row>
      </div>
    );
  }
}
