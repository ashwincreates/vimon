import { Server, Socket } from "socket.io";
import Pty from './PtyService'

class SocketService {
	socket: Socket | null
	pty: Pty | null

	constructor() {
		this.socket = null
		this.pty = null
	}

	attachToServer(server: any) {
		if(!server) {
			throw new Error("Server not Found")
		}

		const io = new Server(server, { cors: { origin: '*' } })
		console.log("Created Socket Server...")
		io.on("connection", (socket: Socket) => {
			console.log("Client connected to socket ", socket.id)
			this.socket = socket

			this.socket.on("disconnect", () => {
				console.log("Disconnected Socket id: ", socket.id)
			})

			this.pty = new Pty(this.socket)
			this.socket.on("input", (input: any) => {
				if (this.pty != null)
					this.pty.write(input)
			})

			this.socket.on("run", (input: any) => {
				if (this.pty != null) {
					this.pty.run(input)
				}
			})
		})
	}
}

export default SocketService
