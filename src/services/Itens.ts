import instance from "../common/config/api"
import { ItensState } from "../interfaces/ItensState";

const itensService = {
    buscar: async () => {
        const resposta = await instance.get<ItensState[]>('/itens');

        return resposta.data
    },
    buscarDeCategorias: async (nomeCategoria: string) => {
        const resposta = await instance.get<ItensState[]>(`/itens?categoria=${nomeCategoria}`);

        return resposta.data;
    }
}

export default itensService