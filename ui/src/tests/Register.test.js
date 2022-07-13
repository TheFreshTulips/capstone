import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from '../components/Register.js';

describe("It should display a register page", () => {
    beforeEach(() => {
        render(
            <Router>
                <Register/>
            </Router>
        );
    })
    it("should render a text field for name", ()=>{
        expect(screen.getByRole("textbox", {name: /name/i})).toBeInTheDocument()
    })
    it("should render a select box for rank", ()=>{
        expect(screen.getByRole("button", {name: /rank/i})).toBeInTheDocument()
    })
    it("should render a select box for organization", ()=>{
        expect(screen.getByRole("button", {name: /Organization/i})).toBeInTheDocument()
    })
    it("should render a text box for email", ()=>{
        expect(screen.getByRole("textbox", {name: /email/i})).toBeInTheDocument()
    })
    it("should render a text box for email", ()=>{
        expect(screen.getByRole("textbox", {name: /email/i})).toBeInTheDocument()
    })
    it("should render a register button", ()=>{
        expect(screen.getByRole("button", {name: /Register/i})).toBeInTheDocument()
    })

})