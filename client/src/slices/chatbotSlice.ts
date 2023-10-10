import { createSlice } from '@reduxjs/toolkit';
import { ChatMessage } from '@/interfaces/ChatMessage';

export interface ChatbotState {
  isOpen: boolean;
  chatHistory: ChatMessage[];
  inputValue: string;
}

const initialState: ChatbotState = {
  isOpen: false,
  chatHistory: [],
  inputValue: '',
};

export const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    toggle: state => {
      state.isOpen = !state.isOpen;
    },
    addChatMessage: (state, action) => {
      state.chatHistory = [...state.chatHistory, action.payload]
    },
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
  },
});

export const { toggle, addChatMessage, setInputValue } = chatbotSlice.actions;

export default chatbotSlice.reducer;
