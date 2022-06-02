import {useEffect, useState} from "react"
import "./Console.css"
import {FiTrash} from "react-icons/fi"
import {Terminal} from 'xterm';
import {FitAddon} from 'xterm-addon-fit'
import "../node_modules/xterm/css/xterm.css"

const Console = (props: any) => {
	const [term, setTerm] = useState<Terminal>()

	useEffect(() => {
			setTerm(new Terminal({convertEol: true}))
	}, [])

	useEffect(() => {
		const fit = new FitAddon()
		if (term != undefined) {
			term.loadAddon(fit)
			term.open(document.getElementById('terminal') as HTMLElement)
			fit.fit()
			term.write("This is console\n")
			term.onKey((e: any) => {
        props.socket?.emit("input", e.key)
				if (e.key.charCodeAt(0) != 13)
					term.write(e.key)
				else
					term.writeln("")
			})
		}

		props.socket?.on("output", (data: any) => {
			term?.writeln("")
			term?.writeln(data)
			console.log(data);
		})

		props.socket?.on("process_complete", (data: any) => {
			term?.writeln(data)
		})

	}, [term])

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
					</div>
				</nav>
				<div id="terminal" className="terminal">
				</div>
				</div>
		)

}

export default Console;
