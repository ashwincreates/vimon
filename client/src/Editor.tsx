import CodeMirror from "@uiw/react-codemirror"
import "codemirror/mode/clike/clike"
import "codemirror/mode/python/python"
import "codemirror/keymap/vim"
import {useContext, useEffect, useState} from "react"
import {FiPlay, FiSettings} from "react-icons/fi"
import {SiCplusplus, SiPython} from "react-icons/si"
import "./Editor.css"
import TextContext from "./TextContext"

const Editor = () => {
	const [language, setLanguage] = useState("C++")
	const [text, setText] = useState<string>("")
	const textContext = useContext(TextContext)

	useEffect(() => {
	}, [])

	const getText = (instance: any, change: any) => {
		setText(instance.getValue())
	}

	const run = (e: any) => {
		textContext.setText(text)
	}

	return (
		<>
			<div className="editorwrapper">
				<nav className="nav">
					<div className="tabline">
						<div className="tab">
							vimon
						</div>
					</div>
					<div className="options">
						<span className="span">
							{language == "C++" ? <SiCplusplus/> : <SiPython/>}
							{language == "C++" ? "cpp" : "python"}
						</span>
						<button className="button" onClick={run}>
							<FiPlay size={18}/>
						</button>
						<button className="button">
							<FiSettings size={18}/>
						</button>
					</div>
				</nav>
				<CodeMirror
					value={text}
					options={{
						/*keyMap: "vim",*/
						mode: "text/x-csrx"
					}}
					onChange={getText}
				/>
				</div>
		</>
	)
}

export default Editor;
