const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
  brightWhite: '\x1b[97m'
};

const creator = (color) => (value) => `${color}${value}${colors.reset}`;

module.exports = {
  red: creator(colors.red),
  green: creator(colors.green),
  yellow: creator(colors.yellow),
  blue: creator(colors.blue),
  magenta: creator(colors.magenta),
  cyan: creator(colors.cyan),
  white: creator(colors.white),
  gray: creator(colors.gray),
  brightRed: creator(colors.brightRed),
  brightGreen: creator(colors.brightGreen),
  brightYellow: creator(colors.brightYellow),
  brightBlue: creator(colors.brightBlue),
  brightMagenta: creator(colors.brightMagenta),
  brightCyan: creator(colors.brightCyan),
  brightWhite: creator(colors.brightWhite),
};
