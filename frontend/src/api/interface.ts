export interface IBackendResponse<T=any>{
data:T;
error?:Record<string, string>;
message:string;
success:boolean;
code:string|number
}

