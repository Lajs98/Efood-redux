import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action) => {
      state.items.push(action.payload)
    },

    remove: (state, action) => {
      state.items.splice(action.payload, 1)
    },

    clear: (state) => {
      state.items = []
    }
  }
})

export const { add, remove, clear } = cartSlice.actions

export default cartSlice.reducer