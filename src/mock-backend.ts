import type {
  RegistrationResponseJSON,
  AuthenticationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/types';
import { User } from './types';

// This is a mock in-memory store for users and their credentials
interface StoredCredential {
  credentialID: string;
  // In a real backend, we'd store publicKey and counter here
}

const users: { [email: string]: User & { challenge?: string } } = {};
const credentials: { [email: string]: StoredCredential } = {};

const rpName = 'Evolve';
const rpID = window.location.hostname;

// Helper to generate a random challenge
const generateChallenge = (): string => {
  const buffer = new Uint8Array(32);
  window.crypto.getRandomValues(buffer);
  return window.btoa(String.fromCharCode.apply(null, Array.from(buffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

/**
 * Registration
 */
export const getRegistrationOptions = async (
  username: string,
  email: string
): Promise<PublicKeyCredentialCreationOptionsJSON> => {
  if (users[email]) {
    throw new Error(`User with email ${email} already exists.`);
  }

  const challenge = generateChallenge();

  const options: PublicKeyCredentialCreationOptionsJSON = {
    rp: { name: rpName, id: rpID },
    user: { id: email, name: username, displayName: username },
    challenge,
    pubKeyCredParams: [
      { type: 'public-key', alg: -7 }, // ES256
      { type: 'public-key', alg: -257 }, // RS256
    ],
    timeout: 60000,
    attestation: 'none',
    excludeCredentials: [],
    authenticatorSelection: {
      residentKey: 'required',
      userVerification: 'preferred',
    },
  };

  // Temporarily store the challenge - FIXED: Create new object instead of spreading
  users[email] = {
    id: email,
    email,
    username,
    level: 1,
    xp: 0,
    avatar: `https://i.pravatar.cc/150?u=${email}`,
    joinDate: new Date().toISOString(),
    completedMissions: 0,
    createdMissions: 0,
    challenge
  };

  return options;
};

export const verifyRegistration = async (
  registrationResponse: RegistrationResponseJSON,
  userDetails: { username: string; email: string }
): Promise<User | null> => {
  const { email, username } = userDetails;
  const user = users[email];

  if (!user || !user.challenge) {
    throw new Error('No challenge found for this user.');
  }

  // In a real backend, we'd verify the response here.
  // For our mock, we'll just assume it's valid.

  const newUser: User = {
    id: email, // Using email as ID for simplicity
    email,
    username,
    level: 1,
    xp: 0,
    avatar: `https://i.pravatar.cc/150?u=${email}`,
    joinDate: new Date().toISOString(),
    completedMissions: 0,
    createdMissions: 0,
  };

  users[email] = newUser;
  credentials[email] = {
    credentialID: registrationResponse.id,
    // In a real backend, we'd store the public key and counter
  };

  console.log('Registered new user:', newUser);
  console.log('With credential:', credentials[email]);

  return newUser;
};

/**
 * Authentication
 */
export const getAuthenticationOptions = async (
  email: string
): Promise<PublicKeyCredentialRequestOptionsJSON> => {
  const user = users[email];
  if (!user) {
    throw new Error(`User with email ${email} not found.`);
  }

  const challenge = generateChallenge();

  const options: PublicKeyCredentialRequestOptionsJSON = {
    challenge,
    timeout: 60000,
    rpId: rpID,
    allowCredentials: credentials[email] ? [{ type: 'public-key', id: credentials[email].credentialID }] : [],
    userVerification: 'preferred',
  };

  // Temporarily store the challenge - FIXED: Use direct assignment
  users[email] = {
    ...user,
    challenge
  };

  return options;
};

export const verifyAuthentication = async (
  authenticationResponse: AuthenticationResponseJSON,
): Promise<User | null> => {
  // In a real backend, we would look up the user by credential ID
  // For our mock, we'll have to find the user whose challenge was just used.
  const user = Object.values(users).find(u => u.challenge !== undefined);

  if (!user) {
    throw new Error('User not found or challenge expired.');
  }

  const credential = credentials[user.email];
  if (!credential || credential.credentialID !== authenticationResponse.id) {
    throw new Error('Credential not found for this user.');
  }

  // In a real backend, we'd verify the signature here.
  // For our mock, we'll assume it's valid.

  // Clear the challenge by creating a new object without it
  const { challenge, ...userWithoutChallenge } = users[user.email];
  users[user.email] = userWithoutChallenge;

  console.log('Authenticated user:', userWithoutChallenge);

  return userWithoutChallenge;
};

export const clearOtherUsersAndTransferProgress = async (
  currentUserEmail: string
): Promise<User | null> => {
  const currentUser = users[currentUserEmail];
  if (!currentUser) {
    throw new Error('Current user not found.');
  }

  let totalXp = 0;
  let totalCompletedMissions = 0;
  let totalCreatedMissions = 0;

  for (const email in users) {
    if (email !== currentUserEmail) {
      const user = users[email];
      totalXp += user.xp;
      totalCompletedMissions += user.completedMissions;
      totalCreatedMissions += user.createdMissions;
      delete users[email];
      delete credentials[email];
    }
  }

  currentUser.xp += totalXp;
  currentUser.completedMissions += totalCompletedMissions;
  currentUser.createdMissions += totalCreatedMissions;

  // Simple level up logic
  while (currentUser.xp >= 1000) {
    currentUser.level += 1;
    currentUser.xp -= 1000;
  }

  users[currentUserEmail] = currentUser;

  return currentUser;
};
