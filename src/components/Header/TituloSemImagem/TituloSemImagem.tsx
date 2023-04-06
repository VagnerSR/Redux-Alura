import { ReactElement } from "react";
import styles from "./TituloSemImagem.module.scss";

interface TituloSemImagemProps {
  titulo: string;
  descricao: string;
  children: ReactElement
}

export default function TituloSemImagem({
  titulo,
  descricao,
  children
}: TituloSemImagemProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>{titulo}</h1>
      <h2 className={styles.descricao}>{descricao}</h2>
      {children}
    </div>
  );
}
