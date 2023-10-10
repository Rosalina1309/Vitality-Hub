import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { ChatMessage } from '@/interfaces/ChatMessage';

export interface chatbotState {
  isOpen: boolean;
  chatHistory: ChatMessage[];
  inputValue: string;
}

const initialState: chatbotState = {
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



export const selectChatbot = (state: RootState) => state.chatbot.isOpen;
export const { toggle, addChatMessage, setInputValue } = chatbotSlice.actions;

export default chatbotSlice.reducer;
