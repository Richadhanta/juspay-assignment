import * as React from "react";
import type { SVGProps } from "react";

const SortIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" {...props}>
    <path 
      d="M4 6l3-3 3 3M4 8l3 3 3-3" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export default SortIcon;