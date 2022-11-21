import cn from 'classnames';

import styles from './styles.module.scss';

const Select = ({
    className,
    children,
    ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <select className={cn(className, styles.input)} {...props}>
        {children}
    </select>
);

export default Select;
