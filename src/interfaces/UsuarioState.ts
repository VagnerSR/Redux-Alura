import { CartoesUsuario } from "./CartoesUsuario";

export interface UsuarioState {
  id: number;
  nome: string;
  cartoes: CartoesUsuario[];
}
