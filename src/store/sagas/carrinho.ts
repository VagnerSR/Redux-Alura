import {
  carregarPagamento,
  finalizarPagamento,
  mudarCarrinho,
  mudarQuantidade,
  mudarTotal,
  resetarCarrinho,
} from "../reducers/carrinho";
import usuariosService from "../../services/Usuarios";
import { Usuarios } from "../../interfaces/Usuarios";
import {
  call,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import cartoesService from "../../services/Cartoes";
import { CartoesState } from "../../interfaces/CartoesState";
import bandeirasService from "../../services/Bandeiras";
import { BandeirasState } from "../../interfaces/BandeirasState";
import { adicionarUsuario } from "../reducers/usuario";
import { RootState } from "../store";
import { ToastId, createStandaloneToast } from "@chakra-ui/toast";
import { CartoesUsuario } from "../../interfaces/CartoesUsuario";

interface FinalizarPagamentoSagaPayload {
  payload: {
    valorTotal: number;
    formaDePagamento: CartoesUsuario;
  };
}

const { toast } = createStandaloneToast();

const usuarioLogado = 1;

function* carregarPagamentoSaga() {
  try {
    const usuario: Usuarios = yield call(
      usuariosService.buscarPorId,
      usuarioLogado
    );
    const cartoes: CartoesState[] = yield call(
      cartoesService.buscarPorIdUsuario,
      usuarioLogado
    );
    const bandeiraIds = cartoes.map((cartao) => cartao.bandeiraId);
    const bandeiras: BandeirasState[] = yield call(
      bandeirasService.buscarPorId,
      bandeiraIds
    );
    const cartoesComBandeiras = cartoes.map((cartao) => {
      const bandeiraDoCarato = bandeiras.find(
        (bandeira) => bandeira.id === cartao.bandeiraId
      );
      return {
        ...cartao,
        taxa: bandeiraDoCarato?.taxa,
        bandeira: bandeiraDoCarato?.nome,
      };
    });
    yield put(adicionarUsuario({ ...usuario, cartoes: cartoesComBandeiras }));
  } catch (error) {}
}

function* calcularTotal() {
  yield delay(500);
  const state: RootState = yield select();
  const total = state.carrinho.data.reduce((total: number, itemNoCarrinho) => {
    const item = state.itens.find((item) => item.id === itemNoCarrinho.id);
    return total + item!.preco * itemNoCarrinho.quantidade;
  }, 0);
  yield put(mudarTotal(total));
}

function* finalizarPagamentoSaga({ payload }: FinalizarPagamentoSagaPayload) {
  const { valorTotal, formaDePagamento } = payload;

  if (valorTotal > formaDePagamento.saldo!) {
    yield toast({
      title: "Erro",
      description: "Erro, saldo insuficiente",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
    return
  } else {
    yield toast({
      title: "Sucesso!",
      description: "Compra realizada com sucesso!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }

  yield put(resetarCarrinho());
}

export function* carrinhoSaga() {
  yield takeLatest(carregarPagamento, carregarPagamentoSaga);
  yield takeEvery([mudarQuantidade, mudarCarrinho], calcularTotal);
  yield takeLatest(finalizarPagamento, finalizarPagamentoSaga);
}
