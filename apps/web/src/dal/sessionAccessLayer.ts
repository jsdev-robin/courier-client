import SessionManager from '@/libs/SessionManager';
import { cookies } from 'next/headers';
import 'server-only';

const utils = new SessionManager();

const sessionAccessLayer = async () => {
  const cookie = (await cookies()).get('xd93cd5')?.value;
  const session = await utils.decrypt(cookie, process.env.ACTIVATION_SECRET);

  return session;
};

export default sessionAccessLayer;
