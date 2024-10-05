import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        const contactIndex = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.items.splice(contactIndex, 1);
      })
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.rejected, handleRejected)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      });
  },
});

// reducer
export const contactsReducer = contactsSlice.reducer;

// selectors
export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

const sortByName = (contact1, contact2) => {
  if (contact1.name < contact2.name) {
    return -1;
  }
  if (contact1.name > contact2.name) {
    return 1;
  }
  return 0;
};

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filterName) => {
    return contacts
      .filter(({ name }) =>
        name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase())
      )
      .sort(sortByName);
  }
);

export const selectHasContacts = createSelector(
  [selectContacts],
  (contacts) => contacts.length > 0
);
