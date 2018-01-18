import { IEffect } from "./effect";

export interface IObject {
    name: string;
    objectType: string;
    xC: number;
    yC: number;
    scaleCurrent: number;
    alphaCurrent: number;
    widthCurrent: number;
    heightCurrent: number;
    text: string;
    effect: IEffect[];
  }