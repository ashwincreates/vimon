import {spawn, ChildProcessWithoutNullStreams} from "child_process"

interface Iprogram {
	program: string
	language: string
}

class ExecService {

	program: Iprogram
	id: string

	constructor(program : Iprogram, id: string) {
		this.program = program
		this.program.program = this.program.program.replace(/"/g, '\\"')
		this.id = id
	}

	exec() {
		var compile = `echo "${this.program.program}" > ${this.id}.cpp && g++ ${this.id}.cpp -o ${this.id} && ./${this.id}` 
		var iprocess = spawn(compile, {
			shell: true,
			cwd: process.env.HOME + "/temp"
		})
		return iprocess
	}
}

export default ExecService;
