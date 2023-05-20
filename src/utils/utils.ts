const MINANGLE = -190.0;
const MAXANGLE = 190.0;

export function angleToInt(angle: number): number {
  return Math.round(angle * 100);
}

export function coordToInt(coord: number): number {
  return Math.round(coord * 10);
}

export function intToAngle(val: number): number {
  return val / 100.0;
}

export function encodeInt16(data: number): number[] {
  const buffer = new ArrayBuffer(2);
  const dataview = new DataView(buffer);
  dataview.setInt16(0, data);
  return Array.from(new Uint8Array(buffer));
}

export function decodeInt8(data: Uint8Array): number {
  const arr = new Int8Array(data.buffer);
  return arr[0];
}

export function decodeInt16(data: Uint8Array): number {
  const view = new DataView(data.buffer);
  return view.getInt16(0, false); // false for big endian
}

export function decodeInt16Vec(data: Uint8Array): Int16Array {
  const buffer = data.buffer;
  const dataview = new DataView(buffer);
  const len = data.length / 2;
  const result = new Int16Array(len);
  for (let i = 0; i < len; i++) {
    result[i] = dataview.getInt16(i * 2);
  }
  return result;
}

export function checkRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

export function checkDegree(degree: number): boolean {
  return checkRange(degree, MINANGLE, MAXANGLE);
}
