import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  adicionarUmaCategoria,
  carregarUmaCategoria,
} from "../reducers/categorias";
import categoriasService from "../../services/Categorias";
import criarTarefa from "./utils/criarTarefa";
import { store } from "../store";

export const categoriasListener = createListenerMiddleware();


categoriasListener.startListening({
    actionCreator: carregarUmaCategoria,
    effect: async (action, { dispatch, fork, unsubscribe }) => {
        const { categorias } = store.getState()
        const nomeCategoria = action.payload
        const categoriaCarregada = categorias.some((categoria) => categoria.id === nomeCategoria)

        if (categoriaCarregada) return;
        if (categorias.length === 5) return unsubscribe()

        await criarTarefa({
            fork,
            dispatch,
            action: adicionarUmaCategoria,
            buscar: categoriasService.buscarUmaCategoria(nomeCategoria!),
            textoCarregando: `Carregando caregoria ${nomeCategoria}`,
            textoSucesso: `Categoria ${nomeCategoria} carregada com sucesso!`,
            textoErro: `Erro na busca de categoria ${nomeCategoria}`
        })
    }
})
