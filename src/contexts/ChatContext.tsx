// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { StreamChat, Channel } from 'stream-chat';
// import { Chat } from 'stream-chat-react';

// interface ChatContextType {
//   chatClient: StreamChat | null;
//   currentChannel: Channel | null;
//   connecting: boolean;
//   setCurrentChannel: (channel: Channel | null) => void;
//   disconnect: () => Promise<void>; // Add disconnect function
// }

// export const ChatContext = createContext<ChatContextType>({} as ChatContextType);

// export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [chatClient, setChatClient] = useState<StreamChat | null>(null);
//   const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
//   const [connecting, setConnecting] = useState(true);

//   useEffect(() => {
//     let client: StreamChat | null = null;

//     const initChat = async () => {
//       try {
//         if (!import.meta.env.VITE_STREAM_API_KEY) {
//           throw new Error('Stream API key is not configured');
//         }
        
//         client = StreamChat.getInstance(import.meta.env.VITE_STREAM_API_KEY);
//         setChatClient(client);
//       } catch (error) {
//         console.error('Error initializing chat client:', error);
//       } finally {
//         setConnecting(false);
//       }
//     };

//     initChat();

//     return () => {
//       const cleanup = async () => {
//         if (client) {
//           await client.disconnectUser();
//           setChatClient(null);
//           setCurrentChannel(null);
//         }
//       };
//       cleanup();
//     };
//   }, []);

//   const disconnect = async () => {
//     if (chatClient) {
//       await chatClient.disconnectUser();
//       setChatClient(null);
//       setCurrentChannel(null);
//     }
//   };

//   if (!chatClient) {
//     return null;
//   }

//   return (
//     <ChatContext.Provider value={{ 
//       chatClient, 
//       currentChannel, 
//       connecting, 
//       setCurrentChannel,
//       disconnect 
//     }}>
//       <Chat client={chatClient}>
//         {children}
//       </Chat>
//     </ChatContext.Provider>
//   );
// };
