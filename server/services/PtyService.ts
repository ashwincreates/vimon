import os from "os";
import { Socket } from "socket.io";
import ExecService from "./ExecService";
import { ChildProcessWithoutNullStreams } from "child_process";

class Pty {
	socket: Socket | null;
	process: ChildProcessWithoutNullStreams | null;

	constructor(socket: Socket | null, input: any) {
		this.socket = socket;
		if (this.socket != null) {
			var exec = new ExecService(input, this.socket.id);
			this.process = exec.exec();

			// output streams
			this.process.stdout.on("data", (data) => {
				this.sendtoClient("output", data);
				console.log(data.toString())
			});
			this.process.stderr.on("data", (data) => {
				this.sendtoClient("output", data);
			});

			//:TODO special reponses for complition
			this.process.on("exit", () => {
				this.sendtoClient("process_complete", "\nExecution Completed");
				if (this.socket != null) {
					this.socket.removeAllListeners('input')
				} 
			});
		} else {
			this.process = null;
		}
	}

	write(data: any) {
		if (this.process != null) {
			this.process.stdin.write(data);
		}
	}

	sendtoClient(stream: any, data: any) {
		if (this.socket != null) {
			this.socket.emit(stream, data.toString());
		}
	}
}

export default Pty;
