import type { AxiosResponse } from "axios";
// import { axiosInstance } from "../api";
import api from "../api";
import type { IBackendResponse } from "../interface";
import type { ICreatePasswordResponse, IForgotPasswordResponse, IVerifyOtpResponse } from "./interface";

export const forgotPassApi = async <TRequest>(data: TRequest) =>{
    const res= await api.post<
        TRequest,
        AxiosResponse<IBackendResponse<IForgotPasswordResponse>>>(
        "/api/v1/forgot/password",
        {...data}
    )
    return res.data;
}

export const verifyPasswordApi = async <TRequest>(data: TRequest) => {
  const res = await api.post<
    TRequest,
    AxiosResponse<IBackendResponse<IVerifyOtpResponse>>>(
    "/api/v1/verify/otp",
    { ...data }
  )
  return res.data;
}

export const createPasswordApi= async<TRequest>(data:TRequest) =>{
  const res = await api.put<
  TRequest,
  AxiosResponse<IBackendResponse<ICreatePasswordResponse>>>(
    "/api/v1/reset/password",
    {...data}
  )
  return res.data;
}