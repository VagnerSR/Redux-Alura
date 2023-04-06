import styles from "./Pagamento.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { carregarPagamento, finalizarPagamento } from "../../store/reducers/carrinho";
import { CartoesUsuario } from "../../interfaces/CartoesUsuario";

export default function Pagamento() {
  const [formaDePagamento, setFormaDePagamento] = useState<CartoesUsuario>({id: '-'})
  const dispatch = useAppDispatch();
  const usuario  = useAppSelector((state) => state.usuario)
  const total = useAppSelector((state) => state.carrinho.total)
  const valorTotal = formaDePagamento.id === '-' ? total : total * formaDePagamento.taxa!

  function mudarFormaDePagamento (e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === '-') return setFormaDePagamento({id: '-'})
    const cartoes = usuario.cartoes.find((cartao) => cartao.id === e.target.value)
    setFormaDePagamento(cartoes!)
  }

  function finalizar() {
    dispatch(finalizarPagamento(valorTotal, formaDePagamento))
  }

  useEffect(() => {
    dispatch(carregarPagamento());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Header titulo="Pagamento" />
      <div className={styles.dados}>
        <p className={styles.forma}>
          Olá {usuario.nome}! Escolha a forma de pagamento:{" "}
        </p>
        <Select value={formaDePagamento.id} onChange={mudarFormaDePagamento} placeholder="Forma de pagamento">
          <option value='-'> Forma de pagamento </option>
          {usuario.cartoes?.map((cartao => (
            <option key={cartao.id} value={cartao.id}>
              {cartao.nome}
            </option>
          )) )}
        </Select>
        <div className={styles.content}>
          {formaDePagamento.id !== '-' && (
            <>
            <p>A forma de pagamento {formaDePagamento.nome} tem taxa de {formaDePagamento.taxa}</p>
            <p>O saldo deste cartão é de R$ {formaDePagamento.saldo?.toFixed(2)}</p>
            </>
          )}
          <p> Total com taxas: R$ {valorTotal.toFixed(2)} </p>
        </div>
        <div className={styles.finalizar}>
          <Button 
            disable={valorTotal === 0 || formaDePagamento.id === '-'}
            onClick={finalizar} > Finalizar Compra </Button>
        </div>
      </div>
    </div>
  );
}
