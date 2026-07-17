import type {DetailedHTMLProps, HTMLAttributes} from 'react';

type MdElementProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  label?: string;
  value?: string;
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'md-filled-button': MdElementProps;
      'md-outlined-button': MdElementProps;
      'md-outlined-text-field': MdElementProps;
      'md-icon': MdElementProps;
    }
  }
}

export {};
