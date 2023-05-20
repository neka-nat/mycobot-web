export class SerialHelper {
  private port?: SerialPort;
  private reader?: ReadableStreamDefaultReader<Uint8Array>;
  private writer?: WritableStreamDefaultWriter<Uint8Array>;

  async connect(baudRate: number = 115200) {
    if (!navigator.serial) {
      throw new Error("Web Serial API not supported.");
    }
    this.port = await navigator.serial.requestPort();
    await this.port.open({ baudRate });
    this.reader = this.port.readable?.getReader();
    this.writer = this.port.writable?.getWriter();
  }

  async disconnect() {
    if (this.reader) {
      await this.reader.cancel();
      this.reader = undefined;
    }
    if (this.writer) {
      await this.writer.close();
      this.writer = undefined;
    }
    if (!this.port) {
      return;
    }
    await this.port.close();
    this.port = undefined;
  }

  async write(data: Uint8Array): Promise<void> {
    if (!this.writer) {
      throw new Error("Not connected");
    }
    return this.writer.write(data);
  }

  async read(footer: number | undefined = undefined): Promise<Uint8Array> {
    if (!this.reader) {
      throw new Error("Not connected");
    }

    let data = new Uint8Array();
    while (true) {
      try {
        const { value, done } = await this.reader.read();
        if (done) {
          break;
        }
        const newData = new Uint8Array(data.length + value.length);
        newData.set(data);
        newData.set(value, data.length);
        data = newData;
        if (footer !== undefined && data[data.length - 1] === footer) {
          break;
        }
      } catch (err) {
        console.error(err);
        break;
      }
    }
    return data;
  }

  async writeAndRead(
    data: Uint8Array,
    footer: number | undefined = undefined
  ): Promise<Uint8Array> {
    await this.write(data);
    return this.read(footer);
  }
}
