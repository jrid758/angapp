import { IEffect } from "./effect";
import { ITextStyle } from "./textstyle";

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
    style: ITextStyle;
    effect: IEffect[];
  }