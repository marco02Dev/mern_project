import { createSlice } from '@reduxjs/toolkit';

type CoursesDataChangedState = {
  dataChanged: boolean;
};

const initialState: CoursesDataChangedState = {
  dataChanged: false,
};

const coursesDataChangedSlice = createSlice({
  name: 'coursesDataChanged',
  initialState,
  reducers: {
    setDataChanged(state) {
      state.dataChanged = !state.dataChanged; 
    },
  },
});

export const { setDataChanged } = coursesDataChangedSlice.actions;
export default coursesDataChangedSlice.reducer;
