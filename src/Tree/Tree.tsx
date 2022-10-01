import { useState, useEffect } from "react";
import { Row } from "./Row/Row";
import s from "./Tree.module.css";

export type NodeType = {
	title: string;
	id: number;
	contains?: Array<NodeType>;
};

export const Tree = () => {
	const [tree, setTree] = useState([] as Array<NodeType>);
	const [uniqueId, setUniqueId] = useState(1);

	const initialTree = [
		{
			title: "Node 1",
			id: 0,
		},
	];

	useEffect(() => {
		setTree(initialTree);
	}, []);

	const addRowHandler = (id: number) => {
		// the wrapper function is needed for the first iteration to work on the original tree
		const wrapper = (tree: Array<NodeType>, id: number) => {
			return tree.map((node) => {
				if (node.id === id) {
					//if array already exists then append node to the end
					if (node.contains) {
						node.contains.push({ title: "Node " + (uniqueId + 1), id: uniqueId + 1 });
						setUniqueId(uniqueId + 1);
					}
					//if array doesn't exist then create
					else {
						node.contains = [{ title: "Node " + (uniqueId + 1), id: uniqueId + 1 }];
						setUniqueId(uniqueId + 1);
					}
					return node;
				} 
				else if (node.contains) wrapper(node.contains, id);

				return node;
			});
		};
		return wrapper(tree, id);
	};

	const delRowHandler = (id: number) => {
		// the wrapper function is needed for the first iteration to work on the original tree
		const wrapper = (tree: Array<NodeType>, id: number) => {
			const filteredTree = tree.filter((node) => node.id !== id);

			return filteredTree.map((node) => {
				const { contains, ...nodeWithoutContains } = node;
				const returnObj = { ...nodeWithoutContains, contains: [] as Array<NodeType> };

				if (contains) {
					returnObj.contains = wrapper(contains, id);
				}

				return returnObj;
			});
		};

		return wrapper(tree, id);
	};

	const buildTree = (tree: Array<NodeType>): JSX.Element[] => {
		return tree.map((node) => {
			return (
				<div className={s.wrapper} key={node.id}>
					<Row
						node={node}
						setTree={setTree}
						addRowHandler={addRowHandler}
						delRowHandler={delRowHandler}
					/>
					{node.contains && buildTree(node.contains)}
				</div>
			);
		});
	};

	const resetHandler = () => {
		setTree(initialTree);
		setUniqueId(1);
	};

	return (
		<div className={s.tree}>
			<button className={s.bReset} onClick={resetHandler}>Reset</button>
			{tree?.length ? buildTree(tree) : <p className={s.no_data}>No data</p>}
		</div>
	);
};
