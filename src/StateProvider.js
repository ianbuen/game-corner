import React, { createContext, useContext, useReducer } from 'react';

// Prepares the data layer
export const StateContext = createContext();

// State
export const initialState = {
    roll: false,
    reels: []
};

// Wrap the app and provide the data layer
export const StateProvider = ({children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// Reducer
const reducer = (state, action) => { 
     
    switch(action.type) {
        case "TOGGLE_ROLL": 
            return {...state, roll: action.roll};
        case "SET_REELS":
            return {...state, reels: action.reels};

        default:
            return state;
    }
};

// Pull information from data layer
export const useStateValue = () => useContext(StateContext);


