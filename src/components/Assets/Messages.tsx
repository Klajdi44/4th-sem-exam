import React from 'react';
import { Props } from './Feed';

function Messages(props: Props) {
  return (
    <svg
      id='Layer_1'
      data-name='Layer 1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 43.82 30.22'
      className={`nav_svg ${props.className}`}
    >
      <path
        d='M28.56,19.15c-6.07,0-5.57,0-6.53,0-4.86.11-5.19,0-6.73,0a3,3,0,0,1-3-3V9.34H5a3,3,0,0,0-3,3v8.43a3,3,0,0,0,.87,2.1,3,3,0,0,0,2.1.87H6.82c.07,1.57.15,3.14.22,4.7l3.9-4.69h1.64c6.07,0,5.57,0,6.53,0,4.86.11,5.19,0,6.72,0a3,3,0,0,0,3-3V19.15ZM7.91,18.05a1.87,1.87,0,1,1,1.87-1.87A1.87,1.87,0,0,1,7.91,18.05Z'
        fill='#1a1a1a'
        className={props.className}
      />
      <path
        d='M15.23,5.56V14a3,3,0,0,0,3,3c1.54,0,1.87.14,6.73,0,.95,0,.45,0,6.53,0H33.1L37,21.67c.08-1.57.15-3.14.23-4.71h1.87a3,3,0,0,0,2.1-.87,3,3,0,0,0,.87-2.1V5.56a3,3,0,0,0-3-3H18.2A3,3,0,0,0,15.23,5.56Zm19,3.87a1.87,1.87,0,1,1,1.87,1.87A1.87,1.87,0,0,1,34.26,9.43Zm-8,0a1.87,1.87,0,1,1,1.87,1.87A1.87,1.87,0,0,1,26.27,9.43Zm-8,0a1.87,1.87,0,1,1,1.87,1.87A1.87,1.87,0,0,1,18.29,9.43Z'
        fill='#1a1a1a'
        className={props.className}
      />
    </svg>
  );
}

export default Messages;
