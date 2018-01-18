export interface IEffect {
    type: string;
    direction: string;
    timeStart: number;
    timeEnd: number;

    xS: number;
    yS: number;
    xE: number;
    yE: number;

    scaleStarting: number;
    scaleEnding: number;

    widthStarting: number;
    heightStarting: number;

    widthEnding: number;
    heightEnding: number;

    alphaStarting: number;
    alphaEnding: number;
  }