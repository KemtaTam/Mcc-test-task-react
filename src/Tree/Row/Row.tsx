import { useState } from "react";
import { NodeType } from "../Tree";
import plus from "../../assets/plus.png";
import rubbish from "../../assets/rubbish.png";
import s from "./Row.module.css";

type PropsType = {
	node: NodeType;
	setTree: any;
	addRowHandler: (id: number) => void;
	delRowHandler: (id: number) => void;
	editTitleHandler: (id: number, newTitle: string) => void;
};

export const Row: React.FC<PropsType> = ({ node, addRowHandler, delRowHandler, setTree, editTitleHandler }) => {
	const [inputValue, setInputValue] = useState(node.title);

	const autoResize = (e: any) => {
		const size = e.target.scrollWidth;
		e.target.style.width = size + "px";
	}

	return (
		<div className={s.wrapper}>
			<p className={s.title}>
				<input
					className={s.input}
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onInput={autoResize}
					onBlur={(e) => editTitleHandler(node.id, e.target.value)}
				/>
			</p>
			<button className={s.bAdd} onClick={() => setTree(addRowHandler(node.id))}>
				<img className={s.img} src={plus} alt="plus" />
			</button>
			<button onClick={() => setTree(delRowHandler(node.id))}>
				<img className={s.img} src={rubbish} alt="rubbish" />
			</button>
		</div>
	);
};
