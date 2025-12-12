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
  'rounded-xl', // Slightly larger radius for precision
  'border-0', // Remove default border
  'px-5', // Increased horizontal padding
  'focus:outline-none', // Remove default focus ring
].join(' ');

// Inset style object for inputs (carved recess effect)
const INSET_STYLE = {
  backgroundColor: '#EFEFEF', // Slightly darker than container for depth
  boxShadow: `
    inset 2px 2px 6px rgba(0, 0, 0, 0.08),
    inset -1px -1px 3px rgba(255, 255, 255, 0.5)
  `,
  fontSize: '15px',
  fontWeight: 400,
  color: '#1A1A19', // Emphasis on user-entered text
  lineHeight: '1.6',
} as const;

// Focus state - subtle lift with accent glow
const FOCUS_STYLE = {
  backgroundColor: '#FFFFFF',
  boxShadow: `
    inset 0px 0px 0px 1px #B6CFFF,
    0px 2px 8px rgba(182, 207, 255, 0.15)
  `,
  fontSize: '15px',
  fontWeight: 400,
  color: '#1A1A19',
  lineHeight: '1.6',
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
          marginBottom: '0.625rem', // Increased from var(--space-3) for more breathing room
          fontSize: '11px',
          fontWeight: 400,
          opacity: 0.42, // Slightly lower for refinement
          letterSpacing: '0.06em',
          textTransform: 'uppercase' as const,
        }}
      >
        {label}
      </label>
      <InputComponent {...inputProps} />
    </div>
  );
}