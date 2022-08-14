import {
  CREATE_DATA,
  DELETE_DATA,
  NO_DATA,
  READ_ALL_DATA,
  UPDATE_DATA,
} from "../types";

export const initialState = {
  db: [],
};

export function crudReducer(state = initialState, action) {
  switch (action.type) {
    case READ_ALL_DATA: {
      return {
        ...state,
        db: action.payload.map((data) => data),
      };
    }

    case CREATE_DATA: {
      return {
        ...state,
        db: [...state.db, action.payload],
      };
    }
    case UPDATE_DATA: {
      let newData = state.db.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      return {
        ...state,
        db: newData,
      };
    }

    // case TYPES.READ_ONE_DATA: {
    //     return;
    // }

    case DELETE_DATA: {
      let newData = state.db.filter((item) => item.id !== action.payload);
      return {
        ...state,
        db: newData,
      };
    }

    case NO_DATA: {
      return initialState;
    }

    default:
      return state;
  }
}
