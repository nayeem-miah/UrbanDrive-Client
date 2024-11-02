/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  MessageList,
  MessageInput,
  Thread,
  ChannelHeader,
} from 'stream-chat-react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';

const SupportChat = () => {
  const [client, setClient] = useState<StreamChat | null>(null);
  const [activeChannel, setActiveChannel] = useState<any>(null);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  // Add console logs to track state changes
  const handleChannelSelect = useCallback((channel: any) => {
    console.log('Selecting channel:', channel?.id);
    setActiveChannel(channel);
  }, []);

  useEffect(() => {
    console.log('Active channel changed:', activeChannel?.id);
  }, [activeChannel]);

  useEffect(() => {
    const initChat = async () => {
      // if (!user?.email?.includes('admin')) {
      //   console.error('Unauthorized access to support chat');
      //   return;
      // }

      const apiKey = import.meta.env.VITE_STREAM_API_KEY;
      if (!apiKey) {
        console.error('Stream API key is missing');
        return;
      }

      const chatClient = StreamChat.getInstance(apiKey);

      try {
        const response = await axiosPublic.post('/chat/admin-token');
        const { token } = response.data;

        await chatClient.connectUser(
          {
            id: 'support-agent',
            name: 'Customer Support',
            role: 'admin',
          },
          token
        );

        setClient(chatClient);
      } catch (error) {
        console.error('Error connecting to chat:', error);
      }
    };

    initChat();

    return () => {
      if (client) {
        setActiveChannel(null); // Clear active channel before disconnecting
        client.disconnectUser().then(() => {
          setClient(null);
        });
      }
    };
  }, [user]);

  if (!client) return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-75"></div>
    </div>
  );

  const filters = { 
    type: 'messaging',
    members: { $in: ['support-agent'] }
  };
  
  const sort = { last_message_at: 1 } as const;

  const CustomChannelPreview = ({ channel, setActiveChannel }: any) => {
    const customer = Object.keys(channel.state.members)
      .find(memberId => memberId !== 'support-agent');

    const lastMessage = channel.state.messages[channel.state.messages.length - 1];
    const isActive = channel === activeChannel;

    return (
      <div 
        className={`p-4 hover:bg-gray-50 cursor-pointer transition-all duration-200 border-b border-gray-100 ${
          isActive ? 'bg-blue-50 hover:bg-blue-50' : ''
        }`}
        onClick={() => {
          console.log('Channel clicked:', channel.id);
          setActiveChannel(channel);
        }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium">
            {customer?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm md:text-base text-gray-800">
              Customer: {customer}
            </div>
            <div className="text-xs md:text-sm text-gray-500 truncate mt-1">
              {lastMessage?.text || 'No messages yet'}
            </div>
          </div>
          {/* Optional: Add an unread indicator or timestamp */}
          {lastMessage?.created_at && (
            <div className="text-xs text-gray-400">
              {new Date(lastMessage.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-100px)] md:h-[800px] mt-12 bg-white rounded-xl shadow-2xl overflow-hidden">
      <Chat client={client} theme="messaging light">
        <div className="flex flex-col md:flex-row h-full">
          {/* Sidebar */}
          <div className={`${activeChannel ? 'hidden' : 'flex'} md:flex md:w-[380px] bg-gray-50 flex-col border-r border-gray-200`}>
            <div className="p-6 bg-white border-b border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800">Support Conversations</h2>
              <p className="text-sm text-gray-500 mt-1">
                {activeChannel ? `Chatting with: ${activeChannel.data?.name || 'Customer'}` : 'Select a conversation to begin'}
              </p>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ChannelList 
                filters={filters} 
                sort={sort}
                Preview={(previewProps) => (
                  <CustomChannelPreview 
                    {...previewProps} 
                    setActiveChannel={handleChannelSelect}
                  />
                )}
              />
            </div>
          </div>

          {/* Chat Area */}
          <div className={`${activeChannel ? 'flex' : 'hidden'} md:flex flex-1 flex-col bg-white`}>
            {activeChannel ? (
              <Channel channel={activeChannel}>
                <Window>
                  <div className="flex items-center p-4 md:p-6 border-b border-gray-200 bg-white shadow-sm">
                    <button 
                      className="md:hidden mr-4 text-gray-600 hover:text-gray-800 transition-colors"
                      onClick={() => setActiveChannel(null)}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <ChannelHeader />
                  </div>
                  <MessageList />
                  <MessageInput />
                </Window>
                <Thread />
              </Channel>
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 max-w-md">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Welcome to Support Chat</h3>
                  <p className="text-gray-500 mb-1">Select a conversation to start chatting</p>
                  <p className="text-sm text-gray-400">Active chats will appear in the sidebar</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Chat>
    </div>
  );
};

export default SupportChat;
