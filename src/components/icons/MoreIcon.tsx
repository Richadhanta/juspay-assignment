import * as React from "react";
import type { SVGProps } from "react";

const MoreIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 2" {...props}>
    <circle cx="1" cy="1" r="1" fill="currentColor" />
    <circle cx="5" cy="1" r="1" fill="currentColor" />
    <circle cx="9" cy="1" r="1" fill="currentColor" />
  </svg>
);

export default MoreIcon;