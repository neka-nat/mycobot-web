import { SerialHelper } from "./SerialHelper";
import { MYCOBOT_COMMANDS } from "./common";
import {
  checkDegree,
  encodeInt16,
  angleToInt,
  intToAngle,
  decodeInt8,
  decodeInt16,
  decodeInt16Vec,
} from "./utils";

export class Command {
  make_command(genre: number, data: number[]) {
    const num_data = data.length;
    const header = [
      MYCOBOT_COMMANDS.HEADER,
      MYCOBOT_COMMANDS.HEADER,
      num_data + 2,
      genre,
    ];
    const footer = [MYCOBOT_COMMANDS.FOOTER];
    return new Uint8Array([...header, ...data, ...footer]);
  }

  isFrameHeader(data: Uint8Array, pos: number): boolean {
    return (
      data[pos] === MYCOBOT_COMMANDS.HEADER &&
      data[pos + 1] === MYCOBOT_COMMANDS.HEADER
    );
  }

  processReceive(data: Uint8Array, genre: number): Int16Array {
    if (data.length === 0) {
      return new Int16Array();
    }
    const index = data.findIndex((_, index, array) =>
      this.isFrameHeader(array, index)
    );
    if (index === -1) {
      return new Int16Array();
    }
    const data_len = data[index + 2] - 2;
    const cmd_id = data[index + 3];
    if (cmd_id !== genre) {
      return new Int16Array();
    }
    const data_pos = index + 4;
    const valid_data = data.slice(data_pos, data_pos + data_len);
    switch (data_len) {
      case 12:
        return decodeInt16Vec(valid_data);
      case 2:
        if (genre === MYCOBOT_COMMANDS.IS_SERVO_ENABLE) {
          return new Int16Array([decodeInt8(valid_data.slice(1, 2))]);
        } else {
          return new Int16Array([decodeInt16(valid_data)]);
        }
      default:
        return new Int16Array([decodeInt8(valid_data)]);
    }
  }

  async powerOn(helper: SerialHelper) {
    await helper.write(this.make_command(MYCOBOT_COMMANDS.POWER_ON, []));
  }

  async powerOff(helper: SerialHelper) {
    await helper.write(this.make_command(MYCOBOT_COMMANDS.POWER_OFF, []));
  }

  async getAngles(helper: SerialHelper): Promise<Float32Array> {
    const data = await helper.writeAndRead(
      this.make_command(MYCOBOT_COMMANDS.GET_ANGLES, []),
      MYCOBOT_COMMANDS.FOOTER
    );
    const res = this.processReceive(data, MYCOBOT_COMMANDS.GET_ANGLES);
    return new Float32Array(res.map(intToAngle));
  }

  async sendAngle(
    helper: SerialHelper,
    id: number,
    angle: number,
    speed: number
  ) {
    if (!checkDegree(angle)) {
      throw new Error("Invalid angle");
    }
    const data = [id, ...encodeInt16(angleToInt(angle)), speed];
    await helper.write(this.make_command(MYCOBOT_COMMANDS.SEND_ANGLE, data));
  }

  async setColor(helper: SerialHelper, r: number, g: number, b: number) {
    await helper.write(
      this.make_command(MYCOBOT_COMMANDS.SET_COLOR, [r, g, b])
    );
  }
}
