/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useCallback } from 'react';
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
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
        className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
          isActive ? 'bg-gray-100' : ''
        }`}
        onClick={() => {
          console.log('Channel clicked:', channel.id);
          setActiveChannel(channel);
        }}
      >
        <div className="font-medium">Customer: {customer}</div>
        <div className="text-sm text-gray-500 truncate">
          {lastMessage?.text || 'No messages yet'}
        </div>
      </div>
    );
  };

  return (
    <div className="h-[800px] bg-white rounded-lg shadow-lg">
      <Chat client={client} theme="messaging light">
        <div className="flex h-full">
          <div className="w-1/3 border-r">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Support Conversations</h2>
              <p className="text-sm text-gray-500">
                {activeChannel ? `Chatting with: ${activeChannel.data?.name || 'Customer'}` : 'Select a chat'}
              </p>
            </div>
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
          <div className="w-2/3">
            {activeChannel ? (
              <Channel channel={activeChannel}>
                <Window>
                  <ChannelHeader />
                  <MessageList />
                  <MessageInput  />
                </Window>
                <Thread />
              </Channel>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <p className="mb-2">Select a conversation to start chatting</p>
                  <p className="text-sm">Active chats will appear in the left sidebar</p>
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
