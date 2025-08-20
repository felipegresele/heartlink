declare module "react-typed" {
  import * as React from "react";

  interface TypedProps {
    strings: string[];
    typeSpeed?: number;
    backSpeed?: number;
    loop?: boolean;
    showCursor?: boolean;
    cursorChar?: string;
  }

  export default class Typed extends React.Component<TypedProps> {}
}