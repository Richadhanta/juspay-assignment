import * as React from "react";
import type { SVGProps } from "react";

const FilterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 9" {...props}>
    <path 
      d="M1 1h16M4 4.5h10M7 8h4" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export default FilterIcon;