export interface LoginResponse {
    token: string;
    user: {
      username: string;
      email: string;
      role: string;
    };
  }