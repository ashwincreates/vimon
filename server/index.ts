import {IncomingMessage, OutgoingMessage} from "http"
import http from "http"
import SocketService from "./services/SocketService"

const server = http.createServer((_: IncomingMessage, res: OutgoingMessage) => {
	res.write("Server Started")
	res.end()
})

server.listen(5000, () => {
	console.log("Server listening on: ", 5000)
	const socketService = new SocketService()

	socketService.attachToServer(server)
})
