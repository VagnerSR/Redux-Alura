import { call, delay, put, takeLatest } from "redux-saga/effects";
import {
  adicionarTodasAsCategorias,
  carregarCategorias,
} from "../reducers/categorias";
import { createStandaloneToast } from "@chakra-ui/toast";
import categoriasService from "../../services/Categorias";
import { CategoriasState } from "../../interfaces/CategoriaState";
import { Task } from "redux-saga";

const { toast } = createStandaloneToast();

function* observarCategorias() {
  toast({
    title: "Carregando",
    description: "Carregando caregorias...",
    status: "loading",
    duration: 2000,
    isClosable: true,
  });

  try {
    yield delay(1000);
    const categorias: CategoriasState[] = yield call(categoriasService.buscar);
    yield put(adicionarTodasAsCategorias(categorias));
    toast({
      title: "Sucesso!",
      description: "Categorias carregadas com sucesso!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  } catch (error) {
    toast({
      title: "Erro",
      description: "Erro na busca de categorias",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  }
}

export function* categoriasSaga() {
  const task: Task<CategoriasState[]> = yield takeLatest(
    carregarCategorias,
    observarCategorias
  );
  yield takeLatest(adicionarTodasAsCategorias, () => task.cancel());
}
