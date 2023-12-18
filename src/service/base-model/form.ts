export interface LoginForm {
  email: string;
  password: string;
}

export interface ForgetPasswordForm {
  email: string;
  operatorType: string;
}

export interface ResetPasswordForm {
  code: string;
  password: string;
}
