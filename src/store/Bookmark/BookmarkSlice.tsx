import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bookmark } from '../../models/Bookmark';

export interface BookmarkState {
  bookmarks: Bookmark[];
}

export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState: {
    bookmarks: [],
  } as BookmarkState,
  reducers: {
    addBookmark: (state, action: PayloadAction<Bookmark>) => {
      state.bookmarks.push(action.payload);
    },
    deleteBookmark: (state, action: PayloadAction<number>) => {
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.id !== action.payload
      );
    },
    updateBookmark: (state, action: PayloadAction<Bookmark>) => {
      console.log('delete');
      state.bookmarks = state.bookmarks.map((bookmark) => {
        if (bookmark.id === action.payload.id) {
          bookmark = action.payload;
        }

        return bookmark;
      });
    },
  },
});

export const {
  addBookmark: addBookmark,
  deleteBookmark: deleteBookmark,
  updateBookmark: updateBookmark,
} = bookmarkSlice.actions;
