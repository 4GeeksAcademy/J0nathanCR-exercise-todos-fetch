import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"

// index.css'
import '../styles/index.css'

// components
import ToDoList from './components/ToDoList.jsx';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<ToDoList />);