interface User{
    id:string
    name:string|null
    email:string|null
    image:string
    createdAt:Date
    updatedAt:Date
    username:string
}
interface Message{
    id:string
    text:string
    createdAt:Date
    updatedAt:Date
    senderId:string
    receiverId:string
    
}

interface Chat{
    id:string
    messages:Message[]
}