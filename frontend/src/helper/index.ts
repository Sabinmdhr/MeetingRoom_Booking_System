export const setLocalStorage =(key:string, value:string)=>{

    localStorage.setItem(key,value)
}

export const removeLocalStorage =(key:string)=>{

    localStorage.removeItem(key)
}

export const getLocalStorage =(key:string):string|null=>{
    return localStorage.getItem(key)
}

export const  fixedValues= {
  forgotEmail : "forgot-email",
  refId : "reference-id",
} as const