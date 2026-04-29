// src/models/auth.model.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  
    accessToken: string;
    refreshToken: string;
    role: string;

}

// Optional: Form input type can be same as LoginRequest
export type LoginFormInputs = LoginRequest;
