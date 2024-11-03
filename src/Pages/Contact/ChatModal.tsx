/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  Window,
  
  MessageList,
  MessageInput,
  Thread,
  
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface ChatModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, setIsOpen }) => {
  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let chatClient: StreamChat | null = null;

    const initChat = async () => {
      if (!user) {
        setError('Please log in to chat with support');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        if (!apiKey) {
          throw new Error('Chat configuration is missing');
        }

        chatClient = StreamChat.getInstance(apiKey);

        // Ensure support agent exists
        await axiosPublic.post('/chat/setup-support');

        // Get user token
        const response = await axiosPublic.post('/chat/token', { 
          userId: user.uid 
        });
        
        await chatClient.connectUser(
          {
            id: user.uid,
            name: user.displayName || 'Guest User',
            image: user.photoURL || undefined,
          },
          response.data.token
        );

        // Create or join support channel
        const channelId = `support-${user.uid}`;
        const newChannel = chatClient.channel('messaging', channelId, {
          name: 'Customer Support',
          members: [user.uid, 'support-agent'],
          created_by: { id: user.uid }
        });

        await newChannel.watch();
        setChannel(newChannel);
        setClient(chatClient);
      } catch (err) {
        console.error('Chat initialization error:', err);
        setError('Failed to connect to chat. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      initChat();
    }

    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
        setChannel(null);
        setClient(null);
      }
    };
  }, [isOpen, user]);

  return (
    <div
      className={`fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-2xl transition-all duration-300 z-40 ${
        isOpen 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      {/* Header */}
      <div className="p-4 bg-primary text-white rounded-t-lg flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Customer Support</h3>
          <p className="text-sm opacity-90">We're here to help!</p>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-primary/90 rounded-full"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="h-[400px]">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center p-4 text-center">
            <div>
              <p className="text-red-500 mb-4">{error}</p>
              {!user && (
                <button 
                  onClick={() => {navigate('/login')}}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                >
                  Log In
                </button>
              )}
            </div>
          </div>
        ) : client && channel ? (
          <Chat client={client} theme="messaging light">
            <Channel channel={channel}>
              <Window>
                <MessageList 
                  messageActions={['edit', 'delete', 'flag', 'mute', 'pin', 'quote', 'reply']}
                />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          </Chat>
        ) : null}
      </div>
    </div>
  );
};

export default ChatModal;
