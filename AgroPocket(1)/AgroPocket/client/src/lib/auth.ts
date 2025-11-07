import type { User, InsertUser, LoginCredentials } from "@shared/schema";

const AUTH_STORAGE_KEY = "agropocket_auth";
const USERS_STORAGE_KEY = "agropocket_users";

// Simple password hashing using Web Crypto API
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export function getCurrentUser(): User | null {
  const authData = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!authData) return null;
  
  try {
    return JSON.parse(authData);
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function clearCurrentUser(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getAllUsers(): User[] {
  const usersData = localStorage.getItem(USERS_STORAGE_KEY);
  if (!usersData) return [];
  
  try {
    return JSON.parse(usersData);
  } catch {
    return [];
  }
}

export function saveUser(user: User): void {
  const users = getAllUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export async function registerUser(data: InsertUser): Promise<{ success: boolean; user?: User; error?: string }> {
  const users = getAllUsers();
  
  if (users.find(u => u.email === data.email)) {
    return { success: false, error: "Email already registered" };
  }
  
  const hashedPassword = await hashPassword(data.password);
  const newUser: User = {
    id: crypto.randomUUID(),
    ...data,
    password: hashedPassword,
  };
  
  saveUser(newUser);
  setCurrentUser(newUser);
  
  return { success: true, user: newUser };
}

export async function loginUser(credentials: LoginCredentials): Promise<{ success: boolean; user?: User; error?: string }> {
  const users = getAllUsers();
  const hashedPassword = await hashPassword(credentials.password);
  const user = users.find(u => u.email === credentials.email && u.password === hashedPassword);
  
  if (!user) {
    return { success: false, error: "Invalid email or password" };
  }
  
  setCurrentUser(user);
  return { success: true, user };
}

export function logoutUser(): void {
  clearCurrentUser();
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
