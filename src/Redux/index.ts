import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { showToastMessage } from "../utils/helper";

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

// interface RootState {
//   todos: Contact[];
// }

interface ContactState {
  items: Contact[];
}

const initialState: ContactState = {
  items: [],
};

const contactSlice: any = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.items.push(action.payload);
      showToastMessage("Contact created.", "success");
    },
    removeContact: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
      showToastMessage("Contact deleted.", "error");
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
        console.log(state.items[index]);
      }
      showToastMessage("Contact details updated.", "success");
    },
  },
});

export const { addContact, removeContact, updateContact } =
  contactSlice.actions;

export default contactSlice.reducers;

const rootReducer = combineReducers({
  contacts: contactSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    contacts: {
      items: [
        {
          id: 1,
          firstName: "Zakaria",
          lastName: "Yazdani",
          status: "Inactive",
        },
        {
          id: 3,
          firstName: "John",
          lastName: "Doe",
          status: "Active",
        },
        {
          id: 5,
          firstName: "Raju",
          lastName: "Singh",
          status: "Active",
        },
      ],
    },
  },
});