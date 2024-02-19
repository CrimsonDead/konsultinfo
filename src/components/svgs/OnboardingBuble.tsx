import * as React from 'react';
import { SVGProps } from 'react';

export const OnboardingBubble = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="150"
    height="150"
    viewBox="0 0 150 150"
    fill="none"
    {...props}>
    <circle
      cx="75"
      cy="75"
      r="75"
      fill="url(#paint0_linear_647_74786)"
      fillOpacity="0.8"
    />
    <defs>
      <linearGradient
        id="paint0_linear_647_74786"
        x1="27.6235"
        y1="13.7346"
        x2="122.222"
        y2="145.525"
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#CAF0F1" />
        <stop
          offset="1"
          stopColor="#E3FBFC"
          stopOpacity="0"
        />
      </linearGradient>
    </defs>
  </svg>
);
