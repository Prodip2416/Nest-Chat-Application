import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } }) // Allow all origins
export class ChatGateway {
  @WebSocketServer() server: Server;

  private users = new Map<string, string>(); // Store socketId -> username

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() username: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.users.set(client.id, username);
    this.server.emit('users', Array.from(this.users.values()));
    console.log(`${username} joined`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: { sender: string; message: string }) {
    this.server.emit('message', data); // Broadcast to all clients
  }

  handleDisconnect(client: Socket) {
    const username = this.users.get(client.id);
    if (username) {
      this.users.delete(client.id);
      this.server.emit('users', Array.from(this.users.values()));
      console.log(`${username} left`);
    }
  }
}
