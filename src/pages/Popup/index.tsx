import React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import Popup from './Popup';
import Setting from "./Setting";

const container = document.getElementById('app-container') as HTMLElement;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Router>
        <Routes>
            <Route path="/" Component={Popup} />
            <Route path="/setting" Component={Setting} />
        </Routes>
    </Router>,
);
