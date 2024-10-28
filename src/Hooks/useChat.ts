import { useContext, useState } from "react";

import { useCallback } from "react";

import { User } from "firebase/auth";
import { ChatContext } from "../contexts/ChatContext";

export const useChat = () => {
    const { chatClient, setCurrentChannel, disconnect } = useContext(ChatContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const connectUserWithRetry = async (userData: User, token: string, maxRetries = 3) => {
      let attempts = 0;
      
      while (attempts < maxRetries) {
        try {
          await chatClient?.connectUser(userData, token);
          return;
        } catch (err) {
          attempts++;
          if (attempts === maxRetries) throw err;
          await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
        }
      }
    };

    const connectUser = useCallback(async (userData: User, token: string) => {
      if (!chatClient) {
        setError('Chat client not initialized');
        return;
      }
  
      setLoading(true);
      setError(null);
  
      try {
        await disconnect();
        await connectUserWithRetry(userData, token);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to connect user';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    }, [chatClient, disconnect]);
  
    const createChannel = useCallback(async (userId: string, otherUserId: string) => {
      if (!chatClient) {
        const error = 'Chat client not initialized';
        setError(error);
        throw new Error(error);
      }
  
      if (!userId || !otherUserId) {
        const error = 'Both user IDs are required';
        setError(error);
        throw new Error(error);
      }
  
      setLoading(true);
      setError(null);
  
      try {
        const members = [userId, otherUserId].sort();
        const channelId = `messaging_${members.join('_')}`;
        
        let channel = chatClient.channel('messaging', channelId);
        
        try {
          await channel.watch();
        } catch {
          channel = chatClient.channel('messaging', channelId, {
            members,
            name: 'Customer Support Chat',
            created_by_id: userId,
          });
          await channel.create();
          await channel.watch();
        }
  
        setCurrentChannel(channel);
        return channel;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create channel';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    }, [chatClient, setCurrentChannel]);
  
    return {
      loading,
      error,
      connectUser,
      createChannel,
      disconnect,
    };
  };
