// src/models/auth.model.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  success: boolean;
  message: string;
}

// Optional: Form input type can be same as LoginRequest
export type LoginFormInputs = LoginRequest;
