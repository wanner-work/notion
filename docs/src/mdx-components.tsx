import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import * as icons from 'lucide-react'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...(icons as unknown as MDXComponents),
    ...defaultMdxComponents,
    ...components
  }
}

declare module 'mdx/types.js' {
  // Augment the MDX types to make it understand React.
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    type Element = React.JSX.Element
    type ElementClass = React.JSX.ElementClass
    type ElementType = React.JSX.ElementType
    type IntrinsicElements = React.JSX.IntrinsicElements
  }
}

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>
}