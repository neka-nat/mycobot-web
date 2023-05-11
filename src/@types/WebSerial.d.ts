interface Navigator {
  serial: {
    getPorts(): Promise<SerialPort[]>;
    requestPort(options?: SerialRequestOptions): Promise<SerialPort>;
  };
}

interface SerialRequestOptions {
  filters?: SerialPortFilter[];
}

interface SerialPortFilter {
  usbVendorId?: number;
  usbProductId?: number;
}

interface SerialPort {
  open(options: SerialOptions): Promise<void>;
  close(): Promise<void>;
  readable: ReadableStream<Uint8Array> | null;
  writable: WritableStream<Uint8Array> | null;
}

interface SerialOptions {
  baudRate: number;
  dataBits?: number;
  stopBits?: number;
  parity?: "none" | "even" | "odd" | "mark" | "space";
  bufferSize?: number;
  flowControl?: "none" | "hardware";
}
