import React from "react";
import { Tree } from "./Tree/Tree";
import "./App.css";

export const initialTree = [
	{
		title: "Node 1",
		id: 0,
	},
];

export const App = () => {

	return (
		<div className="App">
			<Tree />
		</div>
	);
};
