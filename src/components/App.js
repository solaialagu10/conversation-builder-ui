/** @format */
// @ts-nocheck

import React from 'react'; 
import Diagram from "./Diagram";
import Qamaker from "./Qamaker";
import { BrowserRouter, Route, Navigate , Routes, Link } from "react-router-dom";
import "./App.css";

export default function App() {
	const [menu, setMenu] = React.useState('homePage');
	return (
		<BrowserRouter>
		<div>
			<div class="sidenav">
					<ul class="nav">
						<li class={menu === 'homePage'  ? 'selected' :'' }  onClick = {()=>setMenu('homePage')}>
						<Link to="/">Bot Builder</Link>
					</li>
					<li class={menu === 'qaPage'  ? 'selected' :'' }  onClick = {()=>setMenu('qaPage')}>
						<Link to="/QAMaker">Q&A Maker</Link>
					</li>				
					</ul>
			</div>
				<div class="main">
				<Routes>
				<Route exact path="/home" element={<Diagram/>} />
				<Route exact path="/QAMaker" element={<Qamaker/>} />
				<Route path="/" element={<Navigate replace to="/home" />} />			
				</Routes>
				</div>
			</div>
		</BrowserRouter>
	)
}







