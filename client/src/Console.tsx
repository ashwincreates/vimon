import {useContext, useEffect, useState} from "react"
import "./Console.css"
import {io, Socket} from 'socket.io-client'
import {FiPlay, FiTrash} from "react-icons/fi"
import {Terminal} from 'xterm';
import {FitAddon} from 'xterm-addon-fit'
import "../node_modules/xterm/css/xterm.css"

const Console = (props: any) => {
	const [term, setTerm] = useState<Terminal>()
	const test_program = '#include<bits/stdc++.h>\nusing namespace std;\nint main() \{\n\tcout << \\\"Hello World\\\" << endl;\n\}'

	useEffect(() => {
		setTerm(new Terminal())
	}, [])

	useEffect(() => {
		const fit = new FitAddon()
		if (term != undefined) {
			term.loadAddon(fit)
			term.open(document.getElementById('terminal') as HTMLElement)
			fit.fit()
			term.writeln("Hello")
			term.onKey((e: any) => {
        props.socket?.emit("input", e.key)
			})
		}

		props.socket?.on("output", (data: any) => {
			term?.write(data)
		})

	}, [term])

	const test = (_: any) => {
		props.socket?.emit("run", {program: test_program, lang: "cpp"})
		console.log("Printed")
	}

	const clear = (_: any) => {
		term?.reset();
	} ;

		return (
			<div className="consolewrapper">
				<nav className="nav">
					<div className="tabline">
						<div className="tab">
							terminal
						</div>
					</div>
					<div className="options">
						<button className="button" onClick={clear}>
							<FiTrash size={18}/>
						</button>
						<button className="button" onClick={test}>
							<FiPlay size={18}/>
						</button>
					</div>
				</nav>
				<div id="terminal" className="terminal">
				</div>
				</div>
		)

}

export default Console;
