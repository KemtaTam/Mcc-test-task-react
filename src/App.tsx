import React from "react";
import { Tree } from "./Tree/Tree";
import "./App.css";

export const App = () => {
	const initialTree = [
		{
			title: "Node 1",
			id: 0,
		},
	];

	return (
		<div className="App">
			<Tree initialTree={initialTree}/>
		</div>
	);
};
