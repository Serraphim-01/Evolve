import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import {
  startRegistration,
  startAuthentication,
} from '@simplewebauthn/browser';
import {
  getRegistrationOptions,
  verifyRegistration,
  getAuthenticationOptions,
  verifyAuthentication,
  clearOtherUsersAndTransferProgress,
} from '../mock-backend';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  signup: (username: string, email: string) => Promise<void>;
  logout: () => void;
  clearOtherUsers: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signup = async (username: string, email: string) => {
    try {
      const options = await getRegistrationOptions(username, email);
      // FIXED: Wrap options in an object with optionsJSON property
      const registrationResponse = await startRegistration({
        optionsJSON: options
      });
      const newUser = await verifyRegistration(registrationResponse, { username, email });

      if (newUser) {
        setUser(newUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const login = async (email: string) => {
    try {
      const options = await getAuthenticationOptions(email);
      // FIXED: Wrap options in an object with optionsJSON property
      const authenticationResponse = await startAuthentication({
        optionsJSON: options
      });
      const authenticatedUser = await verifyAuthentication(authenticationResponse);

      if (authenticatedUser) {
        setUser(authenticatedUser);
        setIsAuthenticated(true);
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // In a real app, you might also want to clear any session info from the backend
  };

  const clearOtherUsers = async () => {
    if (user) {
      try {
        const updatedUser = await clearOtherUsersAndTransferProgress(user.email);
        if (updatedUser) {
          setUser(updatedUser);
        }
      } catch (error) {
        console.error('Failed to clear other users:', error);
        throw error;
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, clearOtherUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};