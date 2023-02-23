import { Server as IOServer, Socket } from 'socket.io';

export class Sockets {
  private io: IOServer;

  constructor(io: IOServer) {
    this.io = io;
  }
  socketEvents() {
    this.io.on('connection', (socket: Socket) => {
      socket.on('msg-to-server', (_data: Object) => {
        //TODO: emit or print data event test
        //TODO: add tickets events
      })
  
      socket.emit('test', {name: 'Desarrollo & Analítica', date: new Date()});
    });
  }

}