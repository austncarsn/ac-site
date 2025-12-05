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

// Premium inset input styling - creates "carved well" effect
const INPUT_CLASS = [
  'transition-all',
  'duration-200',
  'ease-out',
  'font-smooth',
  'rounded-lg', // Rounded corners for the well
  'border-0', // Remove default border
  'px-4', // Horizontal padding
  'focus:outline-none', // Remove default focus ring
].join(' ');

// Inset style object for inputs (neumorphic/soft UI)
const INSET_STYLE = {
  backgroundColor: '#F3F4F6', // Light gray matching page background
  boxShadow: `
    inset 2px 2px 5px rgba(0, 0, 0, 0.1),
    inset -2px -2px 5px rgba(255, 255, 255, 0.7)
  `,
} as const;

// Focus state - "pops out" when active
const FOCUS_STYLE = {
  backgroundColor: '#FFFFFF',
  boxShadow: `
    0px 2px 4px rgba(0, 0, 0, 0.1),
    0px 0px 0px 2px #6366F1
  `,
} as const;

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
    className: INPUT_CLASS,
    style: {
      ...INSET_STYLE,
      ...(isTextarea
        ? { paddingTop: '16px', paddingBottom: '16px', minHeight: '120px' }
        : { height: '52px' }),
    },
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      Object.assign(e.target.style, FOCUS_STYLE);
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      Object.assign(e.target.style, INSET_STYLE);
    },
    ...(isTextarea && 'rows' in props ? { rows: props.rows } : {}),
    ...(!isTextarea && 'type' in props && props.type ? { type: props.type } : {}),
  };

  return (
    <div>
      <label 
        htmlFor={id} 
        className="text-meta block" 
        style={{ 
          marginBottom: 'var(--space-3)',
          fontSize: '14px',
          fontWeight: 500,
          opacity: 0.7,
        }}
      >
        {label}
      </label>
      <InputComponent {...inputProps} />
    </div>
  );
}