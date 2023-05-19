import React, {useState, useEffect} from 'react';
import {nanoid} from 'nanoid';
import {randomColor} from 'randomcolor';
import Draggable from 'react-draggable';
import closebtn from '../src/close-icon.svg';
import './App.css';

function App() {
	const [item, setItem] = useState('')
	const [items, setItems] = useState(
		JSON.parse(localStorage.getItem('items')) || []
	)
	
	useEffect(() => {
		localStorage.setItem('items', JSON.stringify(items))
	}, [items])

	const newItem = () => {
		if(item.trim() !== '') {
			const newItem = {
				id: nanoid(),
				item: item,
				color: randomColor({
					luminosity: 'light'
				}),
				defaultPos: {
					x: 500,
					y: -500
				}
			}
			setItems((items) => [...items, newItem])
			setItem('')
		} else {
			alert('Enter Something')
			setItem('')
		}
	}

	const deleteNode = (id) => {
		setItems(items.filter((item) => item.id !== id ))
	}

	const updatePos = (data, index) => {
		let newArray = [...items]
		newArray[index].defaultPos = {x: data.x, y: data.y}
		setItems(newArray)
	}

	return (
		<div className="App">
			<div className="wrapper">
				<input 
				value={item}
				onChange={(e) => setItem(e.target.value)} 
				type="text" 
				placeholder="Enter something.."/>
				<button onClick={newItem} className="enter">Enter</button>
			</div>
			{
				items.map((item, index) => {
					return (
						<Draggable 
						key={index}
						defaultPosition={item.defaultPos}
						onStop={(e, data) => {
							updatePos(data, index)
						}}
						>
							<div className="todo__item" style={{backgroundColor: item.color}}>
								{`${item.item}`}
								<button className="delete" onClick={() => deleteNode(item.id)}>
									<img src={closebtn} alt="x"/>
								</button>
							 </div>

						</Draggable>
					)
				})
			}
		</div>
	);
}

export default App;
