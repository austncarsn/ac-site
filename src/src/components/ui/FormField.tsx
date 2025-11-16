import { Input } from './input';
import { Textarea } from './textarea';

interface BaseFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
}

interface InputFieldProps extends BaseFieldProps {
  type?: 'text' | 'email';
  as?: 'input';
}

interface TextareaFieldProps extends BaseFieldProps {
  as: 'textarea';
  rows?: number;
}

type FormFieldProps = InputFieldProps | TextareaFieldProps;

const INPUT_CLASS = [
  'border-0',
  'border-b',
  'border-border',
  'rounded-none',
  'focus:border-foreground',
  'transition-all',
  'duration-500',
  'ease-out',
  'px-0',
  'font-smooth'
].join(' ');

export function FormField(props: FormFieldProps) {
  const { id, name, label, value, onChange, required, placeholder } = props;
  
  const isTextarea = 'as' in props && props.as === 'textarea';
  const InputComponent = isTextarea ? Textarea : Input;
  
  const inputProps = {
    id,
    name,
    value,
    onChange,
    required,
    placeholder,
    className: isTextarea 
      ? `${INPUT_CLASS} resize-none`
      : `${INPUT_CLASS}`,
    style: isTextarea
      ? { paddingTop: 'var(--space-3)', paddingBottom: 'var(--space-3)' }
      : { height: '52px' },
    ...(isTextarea && 'rows' in props ? { rows: props.rows } : {}),
    ...(!isTextarea && 'type' in props && props.type ? { type: props.type } : {}),
  };

  return (
    <div>
      <label htmlFor={id} className="text-meta block" style={{ marginBottom: 'var(--space-3)' }}>
        {label}
      </label>
      <InputComponent {...inputProps} />
    </div>
  );
}