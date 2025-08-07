'use client';

import { useMDXComponent } from 'next-contentlayer2/hooks';
import { Heading, Text } from '@/components/ui/Typography';
import Link from 'next/link';

const mdxComponents = {
  h1: ({ children }: any) => (
    <Heading as="h1" variant="h1" className="mt-12 mb-6">
      {children}
    </Heading>
  ),
  h2: ({ children }: any) => (
    <Heading as="h2" variant="h2" className="mt-10 mb-4">
      {children}
    </Heading>
  ),
  h3: ({ children }: any) => (
    <Heading as="h3" variant="h3" className="mt-8 mb-3">
      {children}
    </Heading>
  ),
  p: ({ children }: any) => (
    <Text variant="body" className="text-secondary-foreground mb-6">
      {children}
    </Text>
  ),
  ul: ({ children }: any) => (
    <ul className="text-secondary-foreground mb-6 list-inside list-disc space-y-2">{children}</ul>
  ),
  ol: ({ children }: any) => (
    <ol className="text-secondary-foreground mb-6 list-inside list-decimal space-y-2">{children}</ol>
  ),
  li: ({ children }: any) => (
    <li className="ml-4">
      <Text variant="body" as="span" className="text-secondary-foreground">
        {children}
      </Text>
    </li>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-magenta text-muted-foreground mb-6 border-l-4 py-2 pl-6 italic">
      {children}
    </blockquote>
  ),
  pre: ({ children }: any) => (
    <pre className="mb-6 overflow-x-auto rounded-xl bg-black/50 card-padding-sm">{children}</pre>
  ),
  code: ({ children }: any) => (
    <code className="text-magenta rounded bg-black/30 px-2 py-1 text-sm">{children}</code>
  ),
  a: ({ href, children }: any) => (
    <Link href={href} className="text-magenta hover:text-magenta/80 underline transition-colors">
      {children}
    </Link>
  ),
  hr: () => <hr className="border-default my-12" />,
  table: ({ children }: any) => (
    <div className="mb-6 overflow-x-auto">
      <table className="w-full">{children}</table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="border-b border-default">{children}</thead>
  ),
  th: ({ children }: any) => (
    <th className="py-2 px-4 text-left font-medium text-offwhite">{children}</th>
  ),
  td: ({ children }: any) => (
    <td className="py-2 px-4 text-secondary-foreground">{children}</td>
  ),
};

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return <Component components={mdxComponents} />;
}