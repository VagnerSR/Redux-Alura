import { ReactElement } from "react";
import styles from "./TituloComImagem.module.scss";

interface TituloComImagemProps {
  titulo: string;
  descricao: string;
  imagem: string;
  className: string;
  children: ReactElement
}

export default function TituloComImagem({
  titulo,
  descricao,
  imagem,
  className,
  children
}: TituloComImagemProps) {
  return (
    <div className={`${className} ${styles.header}`}>
      <div className={styles["header-texto"]}>
        <h1>{titulo}</h1>
        <h2>{descricao}</h2>
        {children}
      </div>
      <div className={styles["header-imagem"]}>
        <img alt={titulo} src={imagem} />
      </div>
    </div>
  );
}
