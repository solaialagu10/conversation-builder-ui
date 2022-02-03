/** @format */
// @ts-nocheck

import React from 'react'; 
import Diagram from "./Diagram";
import Qamaker from "./Qamaker";
import Chatbot from "./Chatbot";
import { BrowserRouter, Route, Navigate , Routes, Link } from "react-router-dom";
import "./App.css";

export default function App() {
	const [menu, setMenu] = React.useState('homePage');
	return (
		<BrowserRouter>
		<div className="body-wrapper">
			{/* <div class="sidenav">
					<ul class="nav">
						<li class={menu === 'homePage'  ? 'selected' :'' }  onClick = {()=>setMenu('homePage')}>
						<Link to="/">Bot Builder</Link>
					</li>
					<li class={menu === 'qaPage'  ? 'selected' :'' }  onClick = {()=>setMenu('qaPage')}>
						<Link to="/QAMaker">Q&A Maker</Link>
					</li>				
					</ul>
			</div> */}
			<div>
				<button className="button-class button-class1"  id={menu === 'homePage'  ? 'button-selected' :'' } onClick = {()=>setMenu('homePage')}>
					<div className="button-text"><Link to="/"> Bot Builder</Link></div>
				</button>				
			</div>
			<div>
				<button className="button-class button-class2" id={menu === 'qaPage'  ? 'button-selected' :'' } onClick = {()=>setMenu('qaPage')}>
				<div className="button-text"><Link to="/QAMaker">Q&A Maker</Link></div>
				</button>				
			</div>
			<div>
				<button className="button-class button-class3" id={menu === 'chatbot'  ? 'button-selected' :'' } onClick = {()=>setMenu('chatbot')}>
				<div className="button-text"><Link to="/Chatbot">Chatbot</Link></div>
				</button>				
			</div>
				<div className="main">
				<Routes>
				<Route exact path="/home" element={<Diagram/>} />
				<Route exact path="/QAMaker" element={<Qamaker/>} />
				<Route exact path="/chatbot" element={<Chatbot/>} />
				<Route path="/" element={<Navigate replace to="/home" />} />			
				</Routes>
				</div>
			</div>
		</BrowserRouter>
	)
}







