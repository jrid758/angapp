import { IEffect } from "./effect";

export interface IObject {
    name: string;
    objectType: string;
    effect: IEffect[];
    text: string;
  }