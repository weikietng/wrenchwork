// Database type definitions for garage management app

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
  userId: string;
}

export interface Account {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  idToken?: string | null;
  accessTokenExpiresAt?: Date | null;
  refreshTokenExpiresAt?: Date | null;
  scope?: string | null;
  password?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Verification {
  id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Garage {
  id: string;
  name: string;
  picture?: string | null;
  email: string;
  location: string;
  phoneNumber: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GarageMember {
  id: string;
  garageId: string;
  userId: string;
  role: string; // 'owner' | 'admin' | 'mechanic' | 'member'
  createdAt: Date;
  updatedAt: Date;
}

// Relation types
export interface GarageWithOwner extends Garage {
  owner: User;
}

export interface GarageWithMembers extends Garage {
  members: (GarageMember & { user: User })[];
}

export interface UserWithGarages extends User {
  ownedGarages: Garage[];
  memberGarages: (GarageMember & { garage: Garage })[];
}
