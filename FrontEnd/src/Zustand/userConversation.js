import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  addMessage: (messages) => set({ messages }),
}));

export default useConversation;

// This is a simple Zustand store for managing the selected conversation, messages, and adding new messages in the chat application. The selectedConversation is the conversation that the user is currently viewing, and messages is an array of messages for that conversation. The addMessage function is used to add new messages to the messages array.

// import React, { createContext, useReducer, useContext } from 'react';

// // Define action types
// const SET_SELECTED_CONVERSATION = 'SET_SELECTED_CONVERSATION';
// const ADD_MESSAGE = 'ADD_MESSAGE';

// // Define the initial state
// const initialState = {
//   selectedConversation: null,
//   messages: [],
// };

// // Define the reducer function
// function reducer(state, action) {
//   switch (action.type) {
//     case SET_SELECTED_CONVERSATION:
//       return { ...state, selectedConversation: action.payload };
//     case ADD_MESSAGE:
//       return { ...state, messages: [...state.messages, action.payload] };
//     default:
//       return state;
//   }
// }

// // Create a context
// const StoreContext = createContext();

// // Create a provider component
// export function StoreProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <StoreContext.Provider value={{ state, dispatch }}>
//       {children}
//     </StoreContext.Provider>
//   );
// }

// // Custom hooks for using the context
// export function useStore() {
//   return useContext(StoreContext);
// }

// export function useStoreActions() {
//   const { dispatch } = useStore();

//   const setSelectedConversation = (selectedConversation) =>
//     dispatch({ type: SET_SELECTED_CONVERSATION, payload: selectedConversation });

//   const addMessage = (message) =>
//     dispatch({ type: ADD_MESSAGE, payload: message });

//   return {
//     setSelectedConversation,
//     addMessage,
//   };
// }

/*
import React from 'react';
import { StoreProvider, useStore, useStoreActions } from './store'; // Adjust the import path as needed

function App() {
  const { state } = useStore();
  const { setSelectedConversation, addMessage } = useStoreActions();

  return (
    <div>
      <h1>Selected Conversation: {state.selectedConversation}</h1>
      <button onClick={() => setSelectedConversation('New Conversation')}>
        Select Conversation
      </button>
      <button onClick={() => addMessage('Hello, world!')}>
        Add Message
      </button>
      <ul>
        {state.messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Root() {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  );
}
*/
