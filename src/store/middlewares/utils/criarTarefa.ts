import { createStandaloneToast } from "@chakra-ui/toast";
import { CategoriasState } from "../../../interfaces/CategoriaState";
import { ActionCreatorWithPayload, Dispatch, ForkedTask, ForkedTaskExecutor } from "@reduxjs/toolkit";
import { ItensState } from "../../../interfaces/ItensState";
import { RootState } from "../../store";

const { toast } = createStandaloneToast();

interface CriarTarefaParams {
    fork: <T>(executor: ForkedTaskExecutor<T>) => ForkedTask<T>
    dispatch: Dispatch
    action: ActionCreatorWithPayload<ItensState[] | CategoriasState[] | CategoriasState, string>
    buscar: Promise<ItensState[] | CategoriasState[] | CategoriasState>
    textoCarregando: string
    textoSucesso: string
    textoErro: string
}

export default async function criarTarefa({
    fork,
    dispatch,
    action,
    buscar,
    textoCarregando,
    textoSucesso,
    textoErro
}: CriarTarefaParams) {
    toast({
        title: "Carregando",
        description: textoCarregando,
        status: "loading",
        duration: 2000,
        isClosable: true,
      });
      const tarefa = fork(async (api) => {
          await api.delay(1000)
        return await buscar;
      });
      
  
      const resposta = await tarefa.result;
  
      if (resposta.status === "ok") {
        toast({
          title: "Sucesso!",
          description: textoSucesso,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        dispatch(action(resposta.value));
        
      }
  
      if (resposta.status === "rejected") {
        toast({
          title: "Erro",
          description: textoErro,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }

      return resposta
}