import { ChangeEventHandler, ReactElement, forwardRef } from 'react';
import styles from './Select.module.scss';

interface SelectProps {
    value?: string
    onChange?: ChangeEventHandler<HTMLSelectElement>
    children: React.ReactNode;
    placeholder: string
}

function Select({ value, onChange, children, placeholder }: SelectProps, ref: React.LegacyRef<HTMLSelectElement>) {
  return (
    <select
    placeholder={placeholder}
      ref={ref}
      value={value}
      onChange={onChange}
      className={styles.select}
    >
      {children}
    </select>
  )
}

export default forwardRef(Select);