import instance from "../common/config/api"
import { CategoriasState } from "../interfaces/CategoriaState";

const categoriasService = {
    buscar: async () => {
        const resposta = await instance.get<CategoriasState[]>('/categorias');

        return resposta.data
    },
    buscarUmaCategoria: async (nomeCategoria: string) => {
        const resposta = await instance.get<CategoriasState>(`/categorias/${nomeCategoria}`);

        return resposta.data
    },
}

export default categoriasService