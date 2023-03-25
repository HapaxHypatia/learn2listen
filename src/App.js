import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import React from "react";
import {Home, Transcribe, AudioSearch} from './pages'
import Nav from "./components/nav";



function App() {
  return (
		<div id={'container'}>
		<Nav/>
		<Routes>
			<Route path="/" element={<Home />} />
			{/*<Route path="login" element={<Login />} />*/}
			{/*<Route path="game/:boardSize/:length" element={<Game/>} />*/}
			<Route path="audiosearch/" element={<AudioSearch />} />
			<Route path="transcribe" element={<Transcribe />} />
			{/*<Route path="signup" element={<SignUp />} />*/}
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
		</div>
);
}

export default App;
