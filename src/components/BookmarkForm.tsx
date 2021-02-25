import { Store } from '@reduxjs/toolkit';
import React from 'react';
import { Button } from 'react-materialize';
import { Bookmark, BookmarkType } from '../models/Bookmark';
import { addBookmark, updateBookmark } from '../store/Bookmark/BookmarkSlice';

export default class BookmarkForm extends React.Component<
  {
    isUpdate: boolean;
    bookmarkType: BookmarkType;
    bookmark?: Bookmark;
    store: Store;
    onSubmit: () => void;
  },
  { bookmark: Bookmark }
> {
  constructor(props: {
    isUpdate: boolean;
    bookmarkType: BookmarkType;
    bookmark?: Bookmark;
    store: Store;
    onSubmit: () => void;
  }) {
    super(props);

    this.state = {
      bookmark: this.props.bookmark || this.getNewBookmark(),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any): void {
    const value = event.target.value;

    this.setState({
      bookmark: { ...this.state.bookmark, [event.target.name]: value },
    });
  }

  handleSubmit(event: any): void {
    event.preventDefault();

    this.setState({
      bookmark: { ...this.state.bookmark, createdDate: new Date().toString() },
    });

    if (this.props.isUpdate) {
      this.props.store.dispatch(updateBookmark(this.state.bookmark));
    } else {
      this.props.store.dispatch(addBookmark(this.state.bookmark));
    }

    this.setState({ bookmark: this.getNewBookmark() });

    this.props.onSubmit();
  }

  getNewBookmark(): Bookmark {
    const newBookmark: Bookmark = new Bookmark(
      Math.floor(Math.random() * 100000),
      '',
      '',
      '',
      100,
      100,
      new Date().toString(),
      this.props.bookmarkType
    );

    if (this.props.bookmarkType === BookmarkType.VIDEO) {
      newBookmark.duration = 10;
    }

    return newBookmark;
  }

  render() {
    const additionnalInputs =
      this.props.bookmarkType === BookmarkType.VIDEO ? (
        <input
          placeholder='Duration'
          type='number'
          id='duration'
          name='duration'
          value={this.state.bookmark?.duration}
          onChange={this.handleChange}
          required
        />
      ) : null;

    return (
      <div className='BookmarkForm'>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder='Title'
            type='text'
            id='title'
            name='title'
            value={this.state.bookmark?.title}
            onChange={this.handleChange}
            required
          />
          <input
            placeholder='Url'
            type='text'
            id='url'
            name='url'
            value={this.state.bookmark?.url}
            onChange={this.handleChange}
            required
          />
          <input
            placeholder='Author'
            type='text'
            id='author'
            name='author'
            value={this.state.bookmark?.author}
            onChange={this.handleChange}
            required
          />
          <input
            placeholder='Width'
            id='width'
            type='number'
            name='width'
            value={this.state.bookmark?.width}
            onChange={this.handleChange}
            required
          />
          <input
            placeholder='Height'
            type='number'
            id='height'
            name='height'
            value={this.state.bookmark?.height}
            onChange={this.handleChange}
            required
          />

          {additionnalInputs}

          <Button waves='light'>
            {this.props.isUpdate ? 'Update' : 'Add'}
          </Button>
        </form>
      </div>
    );
  }
}
