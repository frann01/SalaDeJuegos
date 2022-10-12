import { Timestamp } from "firebase/firestore";

export interface Mensaje {
    usuario: string;
    texto: string;
    fecha: Date;
    foto: string;
}