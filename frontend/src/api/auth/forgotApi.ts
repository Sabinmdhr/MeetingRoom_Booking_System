import type { AxiosResponse } from "axios";
import { axiosInstance } from "../api";
import type { IBackendResponse } from "../interface";
import type {  IForgotPasswordResponse } from "./interface";


export const forgotPassApi = async <TRequest>(data: TRequest) =>{
    const res= await axiosInstance.post<TRequest,AxiosResponse<IBackendResponse<IForgotPasswordResponse>>>(
        "api/admin/login",
        {...data}
    )
    return res.data;
}

