import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import Login from '../components/Login.js';

describe("It should display a login page", () => {
    it("should render a text field for email", ()=>{
        render(
            <Router>
                <Login/>
            </Router>
        );
        expect(screen.getByRole("textbox", {name: /email/i})).toBeInTheDocument()
    })
    it("should render a text field for password", ()=>{
        render(
            <Router>
                <Login/>
            </Router>
        );
        expect(screen.getByRole("button", {name: /Submit/i})).toBeInTheDocument()
    })
})