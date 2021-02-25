import { configureStore, Store } from '@reduxjs/toolkit';
import React from 'react';
import { Col, Row } from 'react-materialize';
import './App.css';
import BookmarkList from './components/BookmarkList';
import { bookmarkSlice } from './store/Bookmark/BookmarkSlice';
import { Bookmark } from './models/Bookmark';

export default class App extends React.Component<
  {},
  { bookmarks: Bookmark[]; store: Store }
> {
  constructor(props: {}) {
    super(props);

    this.state = {
      bookmarks: [],
      store: configureStore({
        reducer: bookmarkSlice.reducer,
      }),
    };
  }

  componentDidMount() {
    this.state.store.subscribe(() => {
      console.log(this.state.store.getState());
      this.setState({ bookmarks: this.state.store.getState().bookmarks });
    });
  }

  render() {
    return (
      <div className='App'>
        <Row>
          <Col l={12}>
            <h1>Bookmark Manager</h1>
          </Col>
        </Row>

        <BookmarkList
          bookmarks={this.state.bookmarks}
          store={this.state.store}
        ></BookmarkList>
      </div>
    );
  }
}
