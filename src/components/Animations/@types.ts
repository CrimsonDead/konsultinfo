import React from 'react';

export interface IProps {
  left: number;
  top: number;
  interval?: number;
  distance?: number;
  step?: number;
  maxRotate?: number;
  children: React.ReactNode;
}

export interface ICoordinates {
  x: number;
  y: number;
}
