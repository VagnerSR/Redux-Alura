import { ButtonHTMLAttributes, MouseEventHandler } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disable?: boolean
}

function Button({ children, type, disable, onClick }: ButtonProps) {
  return (
    <button disabled={disable} className={styles.button} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
