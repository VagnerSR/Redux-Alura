import styles from "./Home.module.scss";
import relogio from "../../assets/inicial.png";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Button from "../../components/Button/Button";
import { useEffect } from "react";
import { carregarCategorias } from "../../store/reducers/categorias";


export default function Home() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const categorias = useAppSelector((state) => state.categorias)

  useEffect(() => {
    dispatch(carregarCategorias())
  }, [dispatch])

  return (
    <div>
      <Header
        titulo="Classificados Tech"
        descricao="Compre diversos tipos de produtos no melhor site do Brasil!"
        imagem={relogio}
        className={styles.header}>
          <Button onClick={() => navigate('/anuncie')}>
            Quero Anunciar
          </Button>
        </Header>

      <div className={styles.categorias}>
        <div className={styles['categorias-title']}>
          <h1>Categorias</h1>
        </div>
        <div className={styles['categorias-container']}>
          {categorias?.map((categoria, index) => (
            <div 
              key={index}
              onClick={() => navigate(`/categorias/${categoria.id}`)} >
              <img src={categoria.thumbnail} alt={categoria.nome} />
              <h1>{categoria.nome}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
