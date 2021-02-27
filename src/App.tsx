import { configureStore, Store } from '@reduxjs/toolkit';
import React from 'react';
import { Col, Row } from 'react-materialize';
import './App.css';
import BookmarkList from './Bookmark/components/BookmarkList';
import { bookmarkSlice } from './Bookmark/BookmarkSlice';
import { Bookmark } from './Bookmark/models/Bookmark';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Modal from 'react-modal';

export default class App extends React.Component<{}, { bookmarks: Bookmark[]; store: Store }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      bookmarks: [],
      store: configureStore({
        reducer: bookmarkSlice.reducer,
        middleware: getDefaultMiddleware({
          serializableCheck: false,
        }),
      }),
    };
  }

  componentDidMount() {
    Modal.setAppElement('#App');
    this.state.store.subscribe(() => this.setState({ bookmarks: this.state.store.getState().bookmarks }));
  }

  render() {
    return (
      <div className='App' id='App'>
        <Row>
          <Col l={12}>
            <h1>Bookmark Manager</h1>
          </Col>
        </Row>

        <BookmarkList bookmarks={this.state.bookmarks} store={this.state.store}></BookmarkList>
        <ToastContainer />
      </div>
    );
  }
}
