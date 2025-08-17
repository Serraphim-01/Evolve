import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ChatMessage } from '../../types';
import { Send, Smile, Paperclip } from 'lucide-react';

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    userId: '2',
    username: 'AlgoMaster',
    message: 'Hey everyone! Just completed the binary tree challenge. The recursive approach was tricky but worth it!',
    timestamp: '2024-01-22T10:30:00Z',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '2',
    userId: '3',
    username: 'ReactGuru',
    message: 'Nice work! I struggled with that one too. The key insight for me was thinking about the base case first.',
    timestamp: '2024-01-22T10:32:00Z',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '3',
    userId: '1',
    username: 'CodeMaster',
    message: 'Great discussion! For anyone working on tree problems, I recommend drawing out the recursive calls on paper first.',
    timestamp: '2024-01-22T10:35:00Z',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '4',
    userId: '4',
    username: 'PythonPro',
    message: 'Anyone up for a pair programming session on the dynamic programming challenges?',
    timestamp: '2024-01-22T10:40:00Z',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  }
];

export const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      avatar: user.avatar
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex-1 bg-black min-h-screen flex flex-col">
      <div className="border-b border-gray-800 p-6">
        <h1 className="text-2xl font-bold text-white">Community Chat</h1>
        <p className="text-gray-400">Connect with fellow developers</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className="flex space-x-4">
            <img
              src={message.avatar}
              alt={message.username}
              className="w-10 h-10 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-white">{message.username}</span>
                <span className="text-xs text-gray-400">
                  {formatTime(message.timestamp)}
                </span>
              </div>
              <div className="bg-gray-900 rounded-lg rounded-tl-none px-4 py-3">
                <p className="text-gray-300">{message.message}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="border-t border-gray-800 p-6">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-white focus:outline-none text-white placeholder-gray-400 pr-20"
            />
            <div className="absolute right-3 top-3.5 flex space-x-2">
              <button
                type="button"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Smile className="h-5 w-5" />
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Send className="h-5 w-5" />
            <span>Send</span>
          </button>
        </div>
      </form>
    </div>
  );
};