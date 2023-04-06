import { ReactElement } from 'react';
import styles from './Header.module.scss';
import TituloComImagem from './TituloComImagem/TituloComImagem';
import TituloSemImagem from './TituloSemImagem/TituloSemImagem';

interface HeaderProps {
    titulo: string
    descricao?: string
    className?: string
    imagem?: string
    children?: ReactElement
}

export default function Header({ titulo, descricao, className = '', imagem, children}: HeaderProps) {
  return (
    <header className={styles.header}>
      {titulo && !imagem &&
        <TituloSemImagem
          titulo={titulo}
          descricao={descricao!}>
            {children!}
          </TituloSemImagem>
      }
      {titulo && imagem &&
        <TituloComImagem
          titulo={titulo}
          descricao={descricao!}
          imagem={imagem}
          className={className}>
            {children!}
          </TituloComImagem>
      }
    </header>
  )
}