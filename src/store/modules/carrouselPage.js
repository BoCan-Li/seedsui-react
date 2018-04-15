// Model
const CHANGE_TAB = 'carrouselPage/CHANGE_TAB'

const initial = {
  tabs: [
    {
      caption: '第一页'
    },
    {
      caption: '第二页'
    }
  ],
  tabsActiveIndex: 0
};
// Reducer
export default function reducer(state = initial, action = {}) {
  switch (action.type) {
    case CHANGE_TAB:
      if (action.index !== state.tabsActiveIndex) {
        state.tabsActiveIndex = action.index;
      }
      return {
        ...state
      }
    default:
      return state;
  }
}

// Action
export function changeTab(index) {
  return {
    type: CHANGE_TAB,
    index
  }
}
