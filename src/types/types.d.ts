
export interface SubjectInfo{
    _id?:string;
    userId?:string;
    name:string;
    createdAt?:string;
    updatedAt?:string;
}

export interface UserInfo{
    _id?:string;
    name:string;
    email:string;
    createAt?:string;
    updatedAt?:string;
}

export interface ContentInfo{
    _id:string;
    subjectId:string;
    title:string;
    content:string;
    createAt?:string;
    updatedAt?:string;
}

export  interface userAuthInfo{
    user:UserInfo | null;
    isLoading:boolean;
    login:(data:{email:string;password:string})=>Promise<void>;
    register:(data:{name:string;password:string,email:string})=>Promise<void>;
    current:()=>Promise<void>
    logout:()=>Promise<void>;

}

export interface subjectStoreInfo{
    subject:SubjectInfo[] | [];
    content:ContentInfo[] | []
    isLoading:boolean;
    
    createSubject:(data:{id?:string;name:string})=>Promise<void>;
    updateSubject:(data:{name:string})=>Promise<void>;
    getSubject:()=>Promise<void>
    deleteSubject:(data:{id:string})=>Promise<void>;
    createContent:(data:{content:string;title:string;id?:string})=>Promise<void>;
    updateContent:(data:{content:string;title:string,id?:string})=>Promise<void>;
    getContent:(data:{id:string})=>Promise<void>;
    deleteContent:(data:{id:string})=>Promise<void>;
}
