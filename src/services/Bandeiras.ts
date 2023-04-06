import instance from "../common/config/api";
import { BandeirasState } from "../interfaces/BandeirasState";

const bandeirasService = {
  buscarPorId: async (bandeiraIds: number[]) => {
    const query = new URLSearchParams()
    bandeiraIds.forEach(id => query.append('id', id.toString()))
    const resposta = await instance.get<BandeirasState[]>(`/bandeiras?=${query.toString()}`);

    return resposta.data;
  },
};

export default bandeirasService;