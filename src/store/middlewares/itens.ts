import { createListenerMiddleware } from "@reduxjs/toolkit";
import { carregarUmaCategoria } from "../reducers/categorias";
import criarTarefa from "./utils/criarTarefa";
import itensService from "../../services/Itens";
import { adicionarItens } from "../reducers/itens";
import { ItensState } from "../../interfaces/ItensState";
import { store } from "../store";

export const itensListener = createListenerMiddleware();

itensListener.startListening({
    actionCreator: carregarUmaCategoria,
    effect: async (action, { fork, dispatch, unsubscribe }) => {
        const { itens } = store.getState()

        if(itens.length === 25) return unsubscribe()

        const nomeCategoria = action.payload

        const itensCarregados = itens.some((item: ItensState) => item.categoria === nomeCategoria)
        if (itensCarregados) return;

       await criarTarefa({
            fork,
            dispatch,
            action: adicionarItens,
            buscar: itensService.buscarDeCategorias(nomeCategoria!),
            textoCarregando: 'Carregando itens...',
            textoSucesso: 'Itens carregadas com sucesso!',
            textoErro: 'Erro na busca de itens'
        })
    }
})