/**
 * Declaration file for modules without type definitions
 * This fixes the TypeScript errors related to missing type definitions
 */

// For mdast (markdown abstract syntax tree)
declare module 'mdast' {
  export interface Root {
    type: 'root';
    children: any[];
  }
}

// For mdx
declare module 'mdx' {
  const MDXContent: (props: any) => JSX.Element;
  export default MDXContent;
}

// For hast (HTML abstract syntax tree)
declare module 'hast' {
  export interface Element {
    type: 'element';
    tagName: string;
    properties?: Record<string, any>;
    children?: any[];
  }
}

// For unist (Universal Syntax Tree)
declare module 'unist' {
  export interface Node {
    type: string;
    data?: Record<string, any>;
    position?: any;
  }
}

// For estree-jsx
declare module 'estree-jsx' {
  export interface JSXElement {
    type: 'JSXElement';
    openingElement: any;
    closingElement: any;
    children: any[];
  }
}

// For debug
declare module 'debug' {
  const debug: any;
  export default debug;
}

// For ms
declare module 'ms' {
  function ms(value: string): number;
  function ms(value: number, options?: any): string;
  export default ms;
} 