import instance from "../common/config/api";
import { Usuarios } from "../interfaces/Usuarios";

const usuariosService = {
  buscarPorId: async (id: number) => {
    const resposta = await instance.get<Usuarios>(`/usuarios/${id}`);

    return resposta.data;
  },
};

export default usuariosService;
