import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { AnimatedSection } from '../ui/AnimatedSection';
import { SectionHeader } from '../ui/SectionHeader';
import { FormField } from '../ui/FormField';
import { isValidEmail } from '../../lib/utils';

interface ContactLinkProps {
  href: string;
  label: string;
  external?: boolean;
}

function ContactLink({ href, label, external = false }: ContactLinkProps) {
  const props = external 
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a 
      href={href}
      className="block link-subtle"
      {...props}
    >
      {label}
    </a>
  );
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Email validation
    if (!isValidEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setFormStatus('idle');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Message sent successfully!');
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 3s
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="section-padding bg-white border-t border-border">
      <div className="container-main">
        {/* Large inset pill frame containing entire section */}
        <div
          style={{
            padding: 'clamp(2.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3.5rem)',
            borderRadius: '60px', // Large pill shape
            backgroundColor: '#F3F4F6',
            boxShadow: `
              inset 8px 8px 16px rgba(163, 177, 198, 0.7),
              inset -8px -8px 16px rgba(255, 255, 255, 1.0)
            `,
          }}
        >
          <SectionHeader accentColor="#B6CFFF">Contact</SectionHeader>

          {/* Framing sentence - invitation */}
          <p
            style={{
              fontSize: 'clamp(15px, 2.2vw, 16px)',
              lineHeight: '1.7',
              color: '#71717A',
              marginTop: 'clamp(0.75rem, 2vw, 1rem)',
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
              maxWidth: '500px',
              fontWeight: 400,
            }}
          >
            If you're working on something interesting, I'd like to hear about it.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: 'clamp(2rem, 5vw, 3rem)' }}>
            {/* Contact Form - 7 columns on desktop */}
            <AnimatedSection className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
                <FormField
                  id="name"
                  name="name"
                  label="Name"
                  placeholder="How should I address you?"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-label="Your name"
                />

                <FormField
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Where can I reply?"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-label="Your email address"
                />

                <FormField
                  id="message"
                  name="message"
                  label="Message"
                  as="textarea"
                  rows={7}
                  placeholder="What are you working on?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-label="Your message"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  aria-label="Send contact form"
                  className="group flex items-center gap-2 self-start transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ 
                    paddingBottom: '4px',
                    fontSize: '15px',
                    fontWeight: 400,
                    letterSpacing: '0.01em',
                    borderBottom: '1px solid #52525B',
                    color: '#1A1A19',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderBottomColor = '#1A1A19';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderBottomColor = '#52525B';
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block animate-spin">
                        <Send size={14} />
                      </span>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send message</span>
                      <Send 
                        size={14} 
                        className="transition-transform duration-200 group-hover:translate-x-0.5" 
                      />
                    </>
                  )}
                </button>

                {/* Screen reader feedback */}
                <div aria-live="polite" aria-atomic="true" className="sr-only">
                  {formStatus === 'success' && 'Form submitted successfully'}
                  {formStatus === 'error' && 'Form submission failed. Please try again.'}
                </div>
              </form>
            </AnimatedSection>

            {/* Contact Info - 5 columns on desktop */}
            <AnimatedSection delay={0.2} className="lg:col-span-5">
              <div 
                className="flex flex-col" 
                style={{ 
                  gap: 'clamp(1.5rem, 4vw, 2rem)',
                  paddingTop: 'clamp(0rem, 2vw, 0.5rem)', // Slight alignment on desktop
                }}
              >
                {/* Email */}
                <div className="group">
                  <p 
                    style={{ 
                      marginBottom: '0.625rem',
                      fontSize: '11px',
                      fontWeight: 400,
                      letterSpacing: '0.06em',
                      color: '#A1A1AA',
                    }}
                  >
                    DIRECT
                  </p>
                  <a
                    href="mailto:austinscarson@gmail.com"
                    className="flex items-center gap-2.5 transition-all duration-200"
                    aria-label="Email Austin Carson"
                    style={{
                      fontSize: '14px',
                      color: '#52525B',
                    }}
                  >
                    <Mail 
                      size={16} 
                      style={{ color: '#B6CFFF', opacity: 0.7 }}
                      className="transition-opacity duration-200 group-hover:opacity-100"
                    />
                    <span className="transition-colors duration-200 group-hover:text-[#1A1A19]">
                      austinscarson@gmail.com
                    </span>
                  </a>
                </div>

                {/* Social Links */}
                <div>
                  <p 
                    style={{ 
                      marginBottom: '0.625rem',
                      fontSize: '11px',
                      fontWeight: 400,
                      letterSpacing: '0.06em',
                      color: '#A1A1AA',
                    }}
                  >
                    ELSEWHERE
                  </p>
                  <div className="flex flex-col" style={{ gap: '0.625rem' }}>
                    {/* GitHub */}
                    <a
                      href="https://github.com/austncarsn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 transition-all duration-200"
                      aria-label="Visit Austin Carson's GitHub profile"
                      style={{
                        fontSize: '14px',
                        color: '#52525B',
                      }}
                    >
                      <Github 
                        size={16} 
                        style={{ color: '#B6CFFF', opacity: 0.7 }}
                        className="transition-opacity duration-200 group-hover:opacity-100"
                      />
                      <span className="transition-colors duration-200 group-hover:text-[#1A1A19]">
                        GitHub
                      </span>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/in/austncarsn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 transition-all duration-200"
                      aria-label="Visit Austin Carson's LinkedIn profile"
                      style={{
                        fontSize: '14px',
                        color: '#52525B',
                      }}
                    >
                      <Linkedin 
                        size={16} 
                        style={{ color: '#B6CFFF', opacity: 0.7 }}
                        className="transition-opacity duration-200 group-hover:opacity-100"
                      />
                      <span className="transition-colors duration-200 group-hover:text-[#1A1A19]">
                        LinkedIn
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}