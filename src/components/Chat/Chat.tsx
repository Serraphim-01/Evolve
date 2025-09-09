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
    avatar: ''
  },
  {
    id: '2',
    userId: '3',
    username: 'ReactGuru',
    message: 'Nice work! I struggled with that one too. The key insight for me was thinking about the base case first.',
    timestamp: '2024-01-22T10:32:00Z',
    avatar: ''
  },
  {
    id: '3',
    userId: '1',
    username: 'CodeMaster',
    message: 'Great discussion! For anyone working on tree problems, I recommend drawing out the recursive calls on paper first.',
    timestamp: '2024-01-22T10:35:00Z',
    avatar: ''
  },
  {
    id: '4',
    userId: '4',
    username: 'PythonPro',
    message: 'Anyone up for a pair programming session on the dynamic programming challenges?',
    timestamp: '2024-01-22T10:40:00Z',
    avatar: ''
  }
];

const BlinkingCursor = () => <span className="animate-ping inline-block w-2 h-4 bg-hacker-green ml-1"></span>;

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
    <div className="flex-1 bg-black min-h-screen flex flex-col tracking-tighter">
      <div className="border-b border-hacker-green p-6">
        <h1 className="text-2xl font-bold text-hacker-green">#general</h1>
        <p className="text-hacker-green">&gt; Connect with fellow developers</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 text-hacker-green text-xs">
        {messages.map((message) => (
          <div key={message.id} className="flex justify-between">
            <div>
              <span className="font-bold">&gt;&gt; {message.username}:</span>
              <span className="ml-2">{message.message}</span>
            </div>
            <span className="text-xs self-start">{formatTime(message.timestamp)}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-6">
        <div className="flex items-center">
            <span className="text-hacker-green">{user?.username}:~$<BlinkingCursor /></span>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none text-hacker-green ml-2"
            />
          <div className="flex space-x-2 ml-4">
            <button
              type="button"
              className="text-white hover:text-hacker-green transition-colors"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="text-white hover:text-hacker-green transition-colors"
            >
              <Smile className="h-5 w-5" />
            </button>
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="text-hacker-green disabled:text-gray-600 hover:text-white transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};