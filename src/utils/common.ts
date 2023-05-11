export const NUM_AXES = 6;

export const ANGLE = {
  J1: 1,
  J2: 2,
  J3: 3,
  J4: 4,
  J5: 5,
  J6: 6,
}

export const COORD = {
  X: 1,
  Y: 2,
  Z: 3,
  RX: 4,
  RY: 5,
  RZ: 6,
}

export const DIRECTION = {
  DECREASE: 0,
  INCREASE: 1,
}

export const MODE = {
  NORMAL: 0,
  ANGULAR: 1,
  LINEAR: 2,
}

export const MYCOBOT_COMMANDS = {
  HEADER: parseInt("0xFE", 16),
  FOOTER: parseInt("0xFA", 16),
  VERSION: parseInt("0x00", 16),

  POWER_ON: parseInt("0x10", 16),
  POWER_OFF: parseInt("0x11", 16),
  IS_POWER_ON: parseInt("0x12", 16),
  RELEASE_ALL_SERVOS: parseInt("0x13", 16),
  IS_CONTROLLER_CONNECTED: parseInt("0x14", 16),
  READ_NEXT_ERROR: parseInt("0x15", 16),
  SET_FREE_MODE: parseInt("0x1A", 16),
  IS_FREE_MODE: parseInt("0x1B", 16),

  GET_ANGLES: parseInt("0x20", 16),
  SEND_ANGLE: parseInt("0x21", 16),
  SEND_ANGLES: parseInt("0x22", 16),
  GET_COORDS: parseInt("0x23", 16),
  SEND_COORD: parseInt("0x24", 16),
  SEND_COORDS: parseInt("0x25", 16),
  PAUSE: parseInt("0x26", 16),

  IS_SERVO_ENABLE: parseInt("0x50", 16),

  SET_COLOR: parseInt("0x6A", 16),

} as const;
