import styles from "./Input.module.scss";
import { ChangeEvent } from "react";

interface InputProps {
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ value, onChange }: InputProps) {
  return <input value={value} onChange={onChange} className={styles.input} />;
}

export default Input;
