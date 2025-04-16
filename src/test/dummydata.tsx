// import {Subscription} from "@/components/SubscriptionList.tsx";
// import {Subscriber} from "framer-motion";
// import {Message} from "postcss";
// import {Account} from "@/components/AccountList.tsx";
//
// export const dummyAccounts: Account[] = [
//   { id: 1, name: 'Kavuong@yahoo.de', unreadMessages: 3 },
//   { id: 2, name: 'minhtv@web.de', unreadMessages: 1 },
//   { id: 3, name: 'minhv90@gmail.com' },
// ];
//
// export const dummySubscriptions: Subscription[] = Array.from({ length: 40 }).map((_, i) => ({
//   id: `sub_${i + 1}`,
//   name: `Dienst ${i + 1}`,
//   account_name: i % 2 === 0 ? 'Kavuong@yahoo.de' : 'minhtv@web.de',
//   unreadMessages: Math.floor(Math.random() * 5),
//   account_email: `acc${i + 1}@anonaddy.com`,
//   link: `https://service${i + 1}.com`,
//   address: `${i + 1} Internet Street`,
//   num_users: 4 + (i % 2),
//   money_received: parseFloat((Math.random() * 10).toFixed(2)),
//   free_spots: Math.floor(Math.random() * 3),
//   created_date: `2024-${(i % 12 + 1).toString().padStart(2, '0')}-15`,
//   email: `service${i + 1}@shary.anonaddy.com`,
//   password: `Pass${i + 1}word!`,
// }));
//
// export const dummySubscribers: Subscriber[] = dummySubscriptions.flatMap((sub, subIdx) =>
//   Array.from({ length: 20 }).map((_, i) => ({
//     id: `user_${subIdx + 1}_${i + 1}`,
//     name: `User ${subIdx + 1}.${i + 1}`,
//     subscription_id: sub.id,
//     unreadMessages: Math.floor(Math.random() * 3),
//   }))
// );
//
// export const dummyMessages: Message[] = dummySubscribers.flatMap((subscriber) =>
//   Array.from({ length: 3 + Math.floor(Math.random() * 3) }).map((_, i) => ({
//     id: `${subscriber.id}_msg_${i + 1}`,
//     sender: i % 2 === 0 ? 'them' : 'me',
//     content: i % 2 === 0
//       ? `Hallo, ich habe eine Frage zu ${subscriber.subscription_id}`
//       : `Kein Problem, ich helfe dir weiter!`,
//     timestamp: `10:${(i * 2 + 10).toString().padStart(2, '0')}`,
//     subscriber_id: subscriber.id,
//   }))
// );