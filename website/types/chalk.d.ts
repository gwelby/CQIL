declare module 'chalk' {
  interface Chalk {
    (text: string): string;
    green: Chalk;
    red: Chalk;
    blue: Chalk;
    cyan: Chalk;
    yellow: Chalk;
    magenta: Chalk;
    white: Chalk;
    bold: Chalk;
    bgRed: Chalk;
    bgGreen: Chalk;
    bgBlue: Chalk;
    bgYellow: Chalk;
    bgMagenta: Chalk;
    bgCyan: Chalk;
    bgWhite: Chalk;
  }

  const chalk: Chalk;
  export = chalk;
}
