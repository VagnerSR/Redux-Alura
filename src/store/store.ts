import { configureStore } from "@reduxjs/toolkit";
import categoriasSlice from "./reducers/categorias";
import itensSlice from "./reducers/itens";
import carrinhoSlice from "./reducers/carrinho";
import buscaSlice from "./reducers/busca";
import { itensListener } from "./middlewares/itens";
import createSagaMiddleware from 'redux-saga'
import { categoriasSaga } from "./sagas/categorias";
import { carrinhoSaga } from "./sagas/carrinho";
import usuarioSlice from "./reducers/usuario";


const sagaMiddlewate = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    categorias: categoriasSlice,
    itens: itensSlice,
    carrinho: carrinhoSlice,
    busca: buscaSlice,
    usuario: usuarioSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      // categoriasListener.middleware,
      itensListener.middleware,
      sagaMiddlewate
      ),
});

sagaMiddlewate.run(categoriasSaga)
sagaMiddlewate.run(carrinhoSaga)

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
