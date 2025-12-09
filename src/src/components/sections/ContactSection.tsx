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
          <SectionHeader accentColor="#809FDC">Contact</SectionHeader>

          <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: 'var(--space-12)' }}>
            {/* Contact Form - 7 columns on desktop */}
            <AnimatedSection className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: 'var(--space-8)' }}>
                <FormField
                  id="name"
                  name="name"
                  label="Name"
                  placeholder="Your name"
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
                  placeholder="your.email@example.com"
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
                  rows={5}
                  placeholder="Tell me about your project"
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
                  className="group flex items-center gap-2 self-start transition-all duration-200 border-b-2 border-foreground disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ 
                    paddingBottom: 'var(--space-2)',
                    fontSize: '17px',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block animate-spin">
                        <Send size={16} />
                      </span>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send message</span>
                      <Send 
                        size={16} 
                        className="transition-transform duration-200 group-hover:translate-x-1" 
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
              <div className="flex flex-col" style={{ gap: 'var(--space-10)' }}>
                {/* Email */}
                <div className="group">
                  <p 
                    className="text-meta" 
                    style={{ 
                      marginBottom: 'var(--space-4)',
                      opacity: 0.5,
                      fontSize: '14px',
                    }}
                  >
                    Email
                  </p>
                  <a
                    href="mailto:austinscarson@gmail.com"
                    className="flex items-center gap-3 transition-all duration-200"
                    aria-label="Email Austin Carson"
                    style={{
                      fontSize: '16px',
                      padding: 'var(--space-2) 0',
                    }}
                  >
                    <Mail 
                      size={18} 
                      style={{ opacity: 0.6 }}
                      className="transition-opacity duration-200 group-hover:opacity-100"
                    />
                    <span className="border-b border-transparent group-hover:border-foreground transition-all duration-200">
                      austinscarson@gmail.com
                    </span>
                  </a>
                </div>

                {/* Social Links */}
                <div>
                  <p 
                    className="text-meta" 
                    style={{ 
                      marginBottom: 'var(--space-4)',
                      opacity: 0.5,
                      fontSize: '14px',
                    }}
                  >
                    Social
                  </p>
                  <div className="flex flex-col" style={{ gap: 'var(--space-4)' }}>
                    {/* GitHub */}
                    <a
                      href="https://github.com/austncarsn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 transition-all duration-200 hover:translate-x-1"
                      aria-label="Visit Austin Carson's GitHub profile"
                      style={{
                        fontSize: '16px',
                        padding: 'var(--space-2) 0',
                      }}
                    >
                      <Github 
                        size={18} 
                        style={{ opacity: 0.6 }}
                        className="transition-opacity duration-200 group-hover:opacity-100"
                      />
                      <span className="border-b border-transparent group-hover:border-foreground transition-all duration-200">
                        GitHub
                      </span>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/in/austncarsn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 transition-all duration-200 hover:translate-x-1"
                      aria-label="Visit Austin Carson's LinkedIn profile"
                      style={{
                        fontSize: '16px',
                        padding: 'var(--space-2) 0',
                      }}
                    >
                      <Linkedin 
                        size={18} 
                        style={{ opacity: 0.6 }}
                        className="transition-opacity duration-200 group-hover:opacity-100"
                      />
                      <span className="border-b border-transparent group-hover:border-foreground transition-all duration-200">
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