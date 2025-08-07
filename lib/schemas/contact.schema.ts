import { z } from 'zod';

// Enhanced contact form schema with comprehensive security validation
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long')
    .regex(/^[a-zA-Z\s\-\'\u00C0-\u017F]+$/, 'Name contains invalid characters'),
  email: z.string()
    .email('Invalid email address')
    .max(254, 'Email too long')
    .refine(
      (email) => {
        // Additional email validation
        const domain = email.split('@')[1];
        return domain && domain.length <= 253 && !domain.includes('..');
      },
      { message: 'Invalid email format' }
    ),
  company: z.string()
    .max(200, 'Company name too long')
    .regex(/^[a-zA-Z0-9\s\-\.\'&\u00C0-\u017F]*$/, 'Company name contains invalid characters')
    .optional(),
  budget: z.enum(['under-10k', '10k-50k', '50k-100k', 'over-100k']).optional(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message too long')
    .refine(
      (message) => !/<script|javascript:|data:|vbscript:|on\w+=/i.test(message),
      { message: 'Message contains potentially dangerous content' }
    ),
  honeypot: z.string().max(0, 'Bot detected'), // Anti-spam field - should be empty
  timestamp: z.number().optional(), // Client timestamp for additional validation
  userAgent: z.string().max(500).optional(), // User agent validation
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Additional validation schemas for API security
export const contactApiSchema = z.object({
  // Rate limiting validation
  sessionId: z.string().uuid().optional(),
  // Request metadata validation
  clientFingerprint: z.string().max(64).optional(),
  timezone: z.string().max(50).optional(),
  language: z.string().max(10).optional(),
});

export type ContactApiData = z.infer<typeof contactApiSchema>;