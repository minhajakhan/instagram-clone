import React from 'react';
import App from "./App.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FirebaseContext from './context/firebase.js';
import { firebase, FieldValue } from './lib/firebase.js';
import './styles/app.css';

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
      <FirebaseContext.Provider value = {{ firebase, FieldValue }}>
        <App />
      </FirebaseContext.Provider>
    </StrictMode>
);
