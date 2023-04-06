import instance from "../common/config/api";
import { CartoesState } from "../interfaces/CartoesState";

const cartoesService = {
  buscarPorIdUsuario: async (usuarioId: number) => {
    const resposta = await instance.get<CartoesState[]>(`/cartoes?usuarioId=${usuarioId}`);

    return resposta.data;
  },
};

export default cartoesService;