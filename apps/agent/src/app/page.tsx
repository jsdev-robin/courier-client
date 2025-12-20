// 'use client';

// import { Redis } from '@upstash/redis';
// import { useEffect } from 'react';

// const redis = new Redis({
//   url: 'https://proud-sunbeam-57313.upstash.io',
//   token: 'key',
// });

// const Home = () => {
//   useEffect(() => {
//     const subscribeToMessages = async () => {
//       const subscriber = redis.subscribe(['locationsChannel']);

//       subscriber.on('message', (data) => {
//         console.log(JSON.parse(data.message));
//       });

//       return () => {
//         subscriber.unsubscribe();
//       };
//     };

//     subscribeToMessages();
//   }, []);

//   return <div>d</div>;
// };

// export default Home;

const page = () => {
  return <div>page</div>;
};

export default page;
