import { io, type Socket } from 'socket.io-client';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://syc-3u4y.onrender.com'
    : 'http://localhost:8004';

export const createSocket = (namespace: string): Socket =>
  io(`${BASE_URL}/${namespace}`, {
    withCredentials: true,
    autoConnect: true,
    transports: ['websocket'],
  });
