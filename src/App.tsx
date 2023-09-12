import React from 'react';
import './App.css';
import HeadPage from "./components/HeadPage/HeadPage";
import Header from "./components/Header/Header";



function App() {
    return (
        <main className="App">
            <Header/>
            <HeadPage/>
        </main>
    );
}

export default App;
