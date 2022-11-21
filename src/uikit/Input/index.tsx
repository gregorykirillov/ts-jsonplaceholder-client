import cn from 'classnames';

import styles from './styles.module.scss';

type InputProps = {
    size?: 'sm' | 'md';
    className?: string;
    inline?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

const Input = ({ size = 'md', className, ...props }: InputProps) => (
    <input className={cn(className, styles.input, styles[size])} {...props} />
);

export default Input;
