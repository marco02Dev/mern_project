import { createSlice } from '@reduxjs/toolkit';

type MenuState = {
  isOpened: boolean;
}

const initialState: MenuState = {
  isOpened: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu: (state): void => {
      state.isOpened = !state.isOpened;
    },
    closeMenu: (state): void => {
      state.isOpened = false;
    }
  },
});

export const { toggleMenu, closeMenu } = menuSlice.actions;
export default menuSlice.reducer;
