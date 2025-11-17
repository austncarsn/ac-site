import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { AnimatedSection } from '../ui/AnimatedSection';
import { SectionHeader } from '../ui/SectionHeader';
import { FormField } from '../ui/FormField';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="section-padding border-t border-border">
      <div className="container-main">
        <SectionHeader accentColor="#6366F1">Contact</SectionHeader>

        <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: 'var(--space-12)' }}>
          {/* Contact Form */}
          <AnimatedSection className="lg:col-span-7">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              <FormField
                id="name"
                name="name"
                label="Name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
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
              />

              <button
                type="submit"
                className="hover:opacity-60 transition-opacity duration-300 border-b border-foreground"
                style={{ paddingBottom: 'var(--space-1)' }}
              >
                Send message
              </button>
            </form>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection delay={0.2} className="lg:col-span-5">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              {/* Email */}
              <div>
                <p className="text-meta" style={{ marginBottom: 'var(--space-3)' }}>Email</p>
                <ContactLink 
                  href="mailto:austncarsn@gmail.com"
                  label="austncarsn@gmail.com"
                />
              </div>

              {/* Social Links */}
              <div>
                <p className="text-meta" style={{ marginBottom: 'var(--space-3)' }}>Social</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <ContactLink 
                    href="https://github.com/austncarsn"
                    label="GitHub"
                    external
                  />
                  <ContactLink 
                    href="https://www.linkedin.com/in/austin-carson-4b059731a/"
                    label="LinkedIn"
                    external
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}