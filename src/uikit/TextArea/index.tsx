import cn from 'classnames';

import styles from './styles.module.scss';

type TextareaProps = {
    className?: string;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>;

const TextArea = ({ className, ...props }: TextareaProps) => (
    <textarea className={cn(className, styles.textarea)} {...props} />
);

export default TextArea;
