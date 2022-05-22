import './App.css'
import Console from './Console'
import Editor from './Editor'
import {Rnd} from 'react-rnd'
import TextContext from './TextContext'
import {useEffect, useState} from 'react'
import {io, Socket} from 'socket.io-client'
import {Terminal} from 'xterm'

function App() {
	const [text, setText] = useState("");
	const [socket, setSocket] = useState<Socket>()
	const [term, setTerm] = useState<Terminal>()

	useEffect(() => {
		setSocket(io("http://localhost:5000/"))
	}, [])

	const run = (t: string) => {
		setText(t)
		console.log(text)
		socket?.emit("run", {program: text, language: "cpp"})
	}

  return (
    <div className="App" id="App">
			<TextContext.Provider value={{text: text, setText: run}}>
				<Rnd className="editordraggable" default={{x: 0, y : 0, width: 500, height: '100%'}} disableDragging={true} maxHeight={'100%'} maxWidth={'100%'} minHeight={'100%'} style={{position: 'relative'}}>
					<Editor></Editor>
				</Rnd>
				<Console socket={socket}></Console>
			</TextContext.Provider>
    </div>
  );
}

export default App;
