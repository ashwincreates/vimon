import os from 'os'
import {spawn} from 'node-pty';
import {Socket} from 'socket.io'

class Pty {
	shell: string
	ptyProcess: any;
	socket: Socket

	constructor(socket: Socket) {
		this.shell = os.platform() === "win32" ? "powershell.exe" : "bash"
		this.ptyProcess = spawn(this.shell, [], {
			name: "xterm-colors",
			cwd: process.env.HOME
		})


		this.socket = socket
	}

	write(data: any) {
		this.ptyProcess.write(data);
		console.log(data)
	}

	sendtoClient(data: any) {
		this.socket.emit("output", data)
	}

	run(data: any) {
		let program: string = data.program
		program = program.toString().replace(/"/g, '\\"')
		const run = `echo "${program}" > ${this.socket.id}.cpp && g++ ${this.socket.id}.cpp -o ${this.socket.id} && ./${this.socket.id}\n`
		this.ptyProcess.write(run)
		this.ptyProcess.on("data", (data: any) => {
			this.sendtoClient(data)
		})
	}
}

export default Pty
