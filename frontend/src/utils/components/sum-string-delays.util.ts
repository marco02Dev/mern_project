type DelayIncrementOptions = {
    increment: number;
  };
  
export const sumStringDelays = (
...args: (string | undefined | DelayIncrementOptions)[]
): string => {
let increment = 1;
let delays: (string | undefined)[] = [];

if (
    args.length > 1 &&
    typeof args[args.length - 1] === "object" &&
    "increment" in (args[args.length - 1] as any)
) {
    increment = (args.pop() as DelayIncrementOptions).increment;
}

delays = args as (string | undefined)[];

const total = delays.reduce((sum, delay) => {
    if (!delay) return sum;
    const numeric = parseInt(delay.replace(/\D/g, ""), 10);
    return sum + (isNaN(numeric) ? 0 : numeric);
}, 0);

return `${total * increment}ms`;
};
  