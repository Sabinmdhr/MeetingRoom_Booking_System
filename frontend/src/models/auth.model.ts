// src/models/auth.model.ts
export interface LoginRequest {
  email: string;
  password: string;

}

export interface LoginResponse {
 data: {
  accesstoken: string;
  refreshtoken: string;
}
 success: boolean;
 messsage: string;
}

// Optional: Form input type can be same as LoginRequest
export type LoginFormInputs = LoginRequest;
