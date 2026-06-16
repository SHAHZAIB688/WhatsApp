export type ChatUser = {
  _id: number;
  name: string;
  avatar?: string | number;
};

export type ChatMessage = {
  _id: number;
  text: string;
  createdAt: Date;
  user: ChatUser;
};

export const CURRENT_USER: ChatUser = {
  _id: 1,
  name: "You",
};

export type ChatContact = {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar: number;
  messagecount: number;
  userId: number;
};

export const CHAT_CONTACTS: ChatContact[] = [
  {
    id: "1",
    name: "John Doe",
    message: "Hello, how are you?",
    time: "10:30 AM",
    avatar: require("../assets/images/icon-default.png"),
    messagecount: 1,
    userId: 2,
  },
  {
    id: "2",
    name: "Jane Smith",
    message: "I am doing great!",
    time: "11:00 AM",
    avatar: require("../assets/images/icon-default.png"),
    messagecount: 0,
    userId: 3,
  },
];

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  "1": [
    {
      _id: 1,
      text: "Hey! Are we still meeting today?",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      user: { _id: 2, name: "John Doe" },
    },
    {
      _id: 2,
      text: "Yes, same time works for me.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60),
      user: CURRENT_USER,
    },
    {
      _id: 3,
      text: "Hello, how are you?",
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
      user: { _id: 2, name: "John Doe" },
    },
  ],
  "2": [
    {
      _id: 1,
      text: "Did you finish the project update?",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
      user: { _id: 3, name: "Jane Smith" },
    },
    {
      _id: 2,
      text: "Almost done, sending it in an hour.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      user: CURRENT_USER,
    },
    {
      _id: 3,
      text: "I am doing great!",
      createdAt: new Date(Date.now() - 1000 * 60 * 45),
      user: { _id: 3, name: "Jane Smith" },
    },
  ],
};

export function getInitialMessages(contactId: string): ChatMessage[] {
  return INITIAL_MESSAGES[contactId] ?? [];
}

export function getContactById(contactId: string): ChatContact | undefined {
  return CHAT_CONTACTS.find((contact) => contact.id === contactId);
}
