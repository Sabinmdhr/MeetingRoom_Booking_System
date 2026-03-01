// src/models/auth.model.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

// Optional: Form input type can be same as LoginRequest
export type LoginFormInputs = LoginRequest;
