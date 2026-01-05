export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface VerifyEmailDTO {
  userId: string;
  otp: string;
}

export interface ForgotPasswordDTO {
  email: string;
}

export interface ResetPasswordDTO {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface RefreshTokenDTO {
  refreshToken: string;
}
