import cn from 'classnames';

import styles from './styles.module.scss';

type ButtonProps = {
    size?: 'sm' | 'md';
    className?: string;
    inline?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
    size = 'md',
    className,
    inline = false,
    ...props
}: ButtonProps) => (
    <button
        className={cn(
            className,
            inline ? styles.inline : styles.button,
            styles[size],
        )}
        {...props}
    />
);

export default Button;
