export default {
  selectNavigation: (state, action) => {
    state.selected = action.payload;
  },
};
