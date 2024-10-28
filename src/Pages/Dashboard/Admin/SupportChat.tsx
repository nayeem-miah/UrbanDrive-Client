import React, { useEffect, useState } from 'react';
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
  const [selectedChannel, setSelectedChannel] = useState<any>(null);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  useEffect(() => {
    const initChat = async () => {
      

      const apiKey = import.meta.env.VITE_STREAM_API_KEY;
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
      if (client) client.disconnectUser();
    };
  }, [user]);

  if (!client) return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );

  // Filter to show only support channels
  const filters = { 
    type: 'messaging',
    members: { $in: ['support-agent'] }
  };
  
  const sort = { last_message_at: -1 };

  const customChannelHeader = () => {
    if (!selectedChannel) return null;
    const customer = Object.keys(selectedChannel.state.members)
      .find(memberId => memberId !== 'support-agent');
    return (
      <div className="p-3 border-b">
        <h3 className="font-semibold">Chat with {customer}</h3>
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
            </div>
            <ChannelList 
              filters={filters} 
              sort={sort}
              Preview={(previewProps) => {
                const channel = previewProps.channel;
                const customer = Object.keys(channel.state.members)
                  .find(memberId => memberId !== 'support-agent');
                return (
                  <div 
                    className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedChannel(channel)}
                  >
                    <div className="font-medium">Customer: {customer}</div>
                    <div className="text-sm text-gray-500 truncate">
                      {channel.state.messages[channel.state.messages.length - 1]?.text || 'No messages yet'}
                    </div>
                  </div>
                );
              }}
            />
          </div>
          <div className="w-2/3">
            <Channel>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          </div>
        </div>
      </Chat>
    </div>
  );
};

export default SupportChat;
