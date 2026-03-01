export interface IForgotPasswordRequest{
    email:string
}
export interface IForgotPasswordResponse{
    otp:string,
}
export interface IVerifyOtpRequest{
    email:string,
    otp:string
}
export interface IVerifyOtpResponse {
    referenceId: string;
}
export interface ICreatePasswordRequest{
    referenceId: string,
    newPassword: string,
    confirmNewPassword: string
}
export interface ICreatePasswordResponse{
}