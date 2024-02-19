export interface IMessage {
    id?: number;
    text: string;
    date: string;
    isAdmin: boolean;
}

// {
//     "id": "6475432a-8088-4a5f-85d9-4bad8ce038c7",
//     "content": "Проблема: dsa;\nРаздел правав: Банкротство;\nИмя: Денчик;\nОтчество: Никитович;\nФамилия: Кастальцов;\nНомер телефона 80291536719;\n",
//     "sendDate": "2024-02-01T10:14:32.1960163",
//     "usreId": "edfabac9-0ba7-4412-8ca8-5919f024382d"
// }

export interface IChat {
    id: number;
    lastMessage: string;
    date: Date;
    username: string;
}