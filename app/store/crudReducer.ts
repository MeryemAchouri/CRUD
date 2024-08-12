import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the user
export interface User {
  id: string;
  name: string;
  email: string;
 
}
export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [
    { id: '1', name: 'Mohammed Allaoui', email: 'mohammed@gmail.com' },
    { id: '2', name: 'Meryem Achouri', email: 'meryem@gmail.com' },
  ],
};

const crudSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state: UserState, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state: UserState, action: PayloadAction<User>) => {
      const { id, name, email } = action.payload;
      const userIndex = state.users.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], name, email };
      }
    },
    deleteUser: (state: UserState, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = crudSlice.actions;
export default crudSlice.reducer;
