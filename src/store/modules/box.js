// Model
const CHANGE_TAB = 'box/CHANGE_TAB'

const initial = {
  tabs: [
    {
      caption: 'box(andriod4.0以上)'
    },
    {
      caption: 'flex(andriod4.4以上)'
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
