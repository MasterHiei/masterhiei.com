import { Context } from '@nuxt/vue-app';
import { LocalUser, GithubUser } from '@/models/index';

interface Storage {
  setState(key: string, val: string | object): string;
}

export interface Auth {
  ctx: Context;
  $storage: Storage;
  strategy: Record<string, string>;
  user?: LocalUser | GithubUser;
  loggedIn: boolean;
  loginWith(strategyName: string, ...args: string[]): Promise<never>;
  logout(): Promise<never>;
  fetchUser(): Promise<never>;
  fetchUserOnce(): Promise<never>;
  hasScope(scopeName: string): boolean;
  setToken(strategyName: string, token?: string): string;
  syncToken(strategyName: string): string;
  onError(handler: (error: Error, payload: object) => void): void;
  setUser(user?: LocalUser): void;
  reset(): Promise<never>;
  redirect(name: string): void;
}
