import {
  UPDATE_CODE_THEME,
  TOGGLE_ADMIN_MODE,
  TOGGLE_SHOW_LINES_NUMBERS,
  TOGGLE_WRAP_LONG_LINES,
} from "../actions/constants";

export const layoutReducer = (
  state = {
    codeTheme: "dracula",
    showLineNumbers: true,
    wrapLongLines: true,
  },
  { type, payload }
) => {
  switch (type) {
    case TOGGLE_ADMIN_MODE:
      return {
        ...state,
        isAdmin: payload,
      };
    case UPDATE_CODE_THEME:
      return {
        ...state,
        codeTheme: payload,
      };
    case TOGGLE_SHOW_LINES_NUMBERS:
      return {
        ...state,
        showLineNumbers: !state.showLineNumbers,
      };
    case TOGGLE_WRAP_LONG_LINES:
      return {
        ...state,
        wrapLongLines: !state.wrapLongLines,
      };
    default:
      return state;
  }
};
