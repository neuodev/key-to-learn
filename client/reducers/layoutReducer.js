import { TOGGLE_ADMIN_MODE } from "../actions/constants";

export const layoutReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case TOGGLE_ADMIN_MODE:
      return {
        ...state,
        isAdmin: payload,
      };
    default:
      return state;
  }
};
