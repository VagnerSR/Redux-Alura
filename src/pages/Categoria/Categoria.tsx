import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import styles from "./Categoria.module.scss";
import Item from "../../components/Item/Item";
import Button from "../../components/Button/Button";
import { useEffect } from "react";
import { carregarUmaCategoria } from "../../store/reducers/categorias";

export default function Categoria() {
  const dispatch = useAppDispatch()
  const { nomeCategoria } = useParams();
  const navigate = useNavigate()
  const { categoria, itens } = useAppSelector((state) => {
    const regexp = new RegExp(state.busca, 'i')
    return {
    categoria: state.categorias.find(
      (categoria) => categoria.id === nomeCategoria
    ),
    itens: state.itens.filter((item) => item.categoria === nomeCategoria && item.titulo.match(regexp)),
  }
});


useEffect(() => {
  dispatch(carregarUmaCategoria(nomeCategoria!))
}, [dispatch, nomeCategoria])

  return (
    <div>
      <Header
        titulo={categoria?.nome!}
        descricao={categoria?.descricao!}
        imagem={categoria?.header}>
          <Button onClick={() => navigate(`/anuncie/${nomeCategoria}`)}>
            Quero anunciar
          </Button>
        </Header>

      <div className={styles.itens}>
        {itens?.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
