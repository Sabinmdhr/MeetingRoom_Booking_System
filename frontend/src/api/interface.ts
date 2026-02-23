export interface IBackendResponse<T=any>{
data:T;
error?:Record<string, string>;
message:string;
code:string|number
}

