import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "./Anuncie.module.scss";
import { useForm } from "react-hook-form";
import { cadastrarItem } from "../../store/reducers/itens";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  carregarCategorias,
  carregarUmaCategoria,
} from "../../store/reducers/categorias";

interface CadastrarParams {
  titulo: string;
  descricao: string;
  favorito: boolean;
  foto: string;
  categoria: string;
  preco: number;
}

function Anuncie() {
  const { nomeCategoria = "" } = useParams();
  const dispatch = useAppDispatch();
  const categorias = useAppSelector((state) =>
    state.categorias.map(({ nome, id }) => ({ nome, id }))
  );

  const { register, handleSubmit } = useForm({
    defaultValues: {
      titulo: "",
      descricao: "",
      favorito: false,
      foto: "",
      categoria: nomeCategoria,
      preco: 0,
    },
  });

  function cadastrar(data: CadastrarParams) {
    dispatch(cadastrarItem(data));
  }

  useEffect(() => {
    dispatch(
      nomeCategoria ? carregarUmaCategoria(nomeCategoria) : carregarCategorias
    );
  }, [dispatch, nomeCategoria]);
  return (
    <div className={styles.container}>
      <Header
        titulo="Anuncie aqui!"
        descricao="Anuncie seu produtor no melhor site do Brasil"
      />

      <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>
        <input
          {...register("titulo", { required: true })}
          placeholder="Nome do produto"
          alt="nome do produto"
        />
        <input
          {...register("descricao", { required: true })}
          placeholder="Descrição do produto"
          alt="Descrição do produto"
        />
        <input
          {...register("foto", { required: true })}
          placeholder="Url da imagem do produto"
          alt="Url da imagem do produto"
        />
        <select
          {...register("categoria", { required: true })}
          disabled={!!nomeCategoria}
        >
          <option value="" disabled>
            {" "}
            Selecione a categoria{" "}
          </option>
          {categorias.map((categoria) => (
            <option key={categoria.id}>{categoria.id}</option>
          ))}
        </select>

        <input
          {...register("preco", { required: true, valueAsNumber: true })}
          type="number"
          placeholder="Preço do produto"
        />

        <Button type="submit">Cadastrar produto</Button>
      </form>
    </div>
  );
}

export default Anuncie;
