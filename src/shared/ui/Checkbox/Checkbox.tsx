import cls from './Checkbox.module.scss';
import { HTMLInputProps } from '../Input/Input.types.ts';

interface CheckboxProps extends HTMLInputProps {
  className?: string;
}

export const Checkbox = (props: CheckboxProps) => {
  const { className, ...otherProps } = props;
  return (
    <input
      data-testid="checkbox"
      type="checkbox"
      className={`${cls.primary} ${className}`}
      {...otherProps}
    />
  );
};
