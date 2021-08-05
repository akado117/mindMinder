import { types as CSSTypes } from 'typestyle';

export type CSS = CSSTypes.NestedCSSProperties;

export interface MediaCSS {
  shared?: CSS;
  phone?: CSS;
  tablet?: CSS;
  mobile?: CSS;
  desktop?: CSS;
}

export type ClassName = string;

export interface ClassNameProp {
  className?: ClassName;
}

export type MarginCSS = Pick<CSS, 'marginTop' | 'marginBottom' | 'marginLeft' | 'marginRight'>;

export type FlexCSS = Pick<
  CSS,
  'flexDirection' | 'flexWrap' | 'justifyContent' | 'alignItems' | 'alignContent' | 'flexGrow' | 'flexShrink'
>;

export type TypographyCSS = Pick<CSS, 'textAlign' | 'fontWeight' | 'fontStyle' | 'fontSize'>;

export type TransitionCSS = Pick<
  CSS,
  'transitionProperty' | 'transitionDuration' | 'transitionTimingFunction' | 'transitionDelay'
>;

export type AnimationCSS = Pick<
  CSS,
  | 'animationName'
  | 'animationDuration'
  | 'animationTimingFunction'
  | 'animationDelay'
  | 'animationIterationCount'
  | 'animationDirection'
>;