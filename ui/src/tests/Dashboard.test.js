import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from '../components/Dashboard.js';
import { TaskContext } from "../App.js";
let tc;
describe("<Dashboard />", () => {
    // TODO: You need to be logged in for this render to work
})