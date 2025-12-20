import { io, type Socket } from 'socket.io-client';

const BASE_URL = 'http://localhost:8004';

export const createSocket = (namespace: string): Socket =>
  io(`${BASE_URL}/${namespace}`, {
    withCredentials: true,
    autoConnect: true,
    transports: ['websocket'],
  });
