/**
 * Binary Stream Protocol Demuxer and Types for Web Reader Progressive Streaming.
 *
 * Endpoint: POST /v1/web-reader/convert/stream
 *
 * Frame Format:
 * - Byte 0: Frame Type (0x01 = PCM Audio, 0x02 = JSON Control)
 * - Bytes 1..4: Payload Length (Uint32 Big-Endian)
 * - Bytes 5..N: Payload (N bytes)
 */

export const FRAME_TYPE_AUDIO = 0x01;
export const FRAME_TYPE_CONTROL = 0x02;

export const MAX_FRAME_PAYLOAD_SIZE = 10 * 1024 * 1024;

export interface ControlFrameStart {
  t: 'start';
  conversionId: string;
  languageCode?: string;
  sampleRate?: number;
  sampleSize?: number;
  channels?: number;
  title?: string;
  wordCount?: number;
}

export interface ControlFrameProgress {
  t: 'progress';
  generatedSeconds: number;
}

export interface ControlFrameDone {
  t: 'done';
  durationSeconds: number;
}

export interface ControlFrameError {
  t: 'error';
  code: number;
  message: string;
}

export type ControlFrame =
  | ControlFrameStart
  | ControlFrameProgress
  | ControlFrameDone
  | ControlFrameError;

export interface AudioStreamFrame {
  type: 'audio';
  pcmData: Uint8Array;
}

export interface ControlStreamFrame {
  type: 'control';
  payload: ControlFrame;
}

export type StreamFrame = AudioStreamFrame | ControlStreamFrame;

export class WebReaderStreamDemuxer {
  private buffer: Uint8Array = new Uint8Array(0);
  private trailingOddByte: number | null = null;
  private textDecoder: TextDecoder = new TextDecoder('utf-8');

  public feed(chunk: Uint8Array): StreamFrame[] {
    if (chunk.length === 0) return [];

    if (this.buffer.length === 0) {
      this.buffer = chunk;
    } else {
      const merged = new Uint8Array(this.buffer.length + chunk.length);
      merged.set(this.buffer, 0);
      merged.set(chunk, this.buffer.length);
      this.buffer = merged;
    }

    const frames: StreamFrame[] = [];

    while (this.buffer.length >= 5) {
      const frameType = this.buffer[0];

      if (frameType !== FRAME_TYPE_AUDIO && frameType !== FRAME_TYPE_CONTROL) {
        // Skip 1 byte to try to resync if corrupted
        this.buffer = this.buffer.subarray(1);
        continue;
      }

      const payloadLength =
        ((this.buffer[1] << 24) |
          (this.buffer[2] << 16) |
          (this.buffer[3] << 8) |
          this.buffer[4]) >>>
        0;

      if (payloadLength > MAX_FRAME_PAYLOAD_SIZE) {
        this.buffer = this.buffer.subarray(1);
        continue;
      }

      const totalFrameSize = 5 + payloadLength;
      if (this.buffer.length < totalFrameSize) {
        break;
      }

      const rawPayload = this.buffer.subarray(5, totalFrameSize);
      this.buffer = this.buffer.subarray(totalFrameSize);

      if (frameType === FRAME_TYPE_AUDIO) {
        let pcmPayload: Uint8Array;

        if (this.trailingOddByte !== null) {
          pcmPayload = new Uint8Array(1 + rawPayload.length);
          pcmPayload[0] = this.trailingOddByte;
          pcmPayload.set(rawPayload, 1);
          this.trailingOddByte = null;
        } else {
          pcmPayload = rawPayload;
        }

        if (pcmPayload.length % 2 !== 0) {
          this.trailingOddByte = pcmPayload[pcmPayload.length - 1];
          pcmPayload = pcmPayload.subarray(0, pcmPayload.length - 1);
        }

        if (pcmPayload.length > 0) {
          frames.push({
            type: 'audio',
            pcmData: pcmPayload,
          });
        }
      } else if (frameType === FRAME_TYPE_CONTROL) {
        const jsonStr = this.textDecoder.decode(rawPayload);
        try {
          const payload = JSON.parse(jsonStr) as ControlFrame;
          if (payload && typeof payload === 'object' && 't' in payload) {
            frames.push({
              type: 'control',
              payload,
            });
          }
        } catch (e) {
          console.warn('Failed to parse control frame JSON:', jsonStr, e);
        }
      }
    }

    return frames;
  }

  public reset(): void {
    this.buffer = new Uint8Array(0);
    this.trailingOddByte = null;
  }
}

export function createWavHeader(
  totalPcmBytes: number,
  sampleRate = 16000,
  channels = 1,
  bitsPerSample = 16,
): ArrayBuffer {
  const bytesPerSample = bitsPerSample / 8;
  const blockAlign = channels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;

  const header = new ArrayBuffer(44);
  const view = new DataView(header);

  // RIFF descriptor
  view.setUint8(0, 0x52); // 'R'
  view.setUint8(1, 0x49); // 'I'
  view.setUint8(2, 0x46); // 'F'
  view.setUint8(3, 0x46); // 'F'
  view.setUint32(4, 36 + totalPcmBytes, true);
  view.setUint8(8, 0x57); // 'W'
  view.setUint8(9, 0x41); // 'A'
  view.setUint8(10, 0x56); // 'V'
  view.setUint8(11, 0x45); // 'E'

  // fmt sub-chunk
  view.setUint8(12, 0x66); // 'f'
  view.setUint8(13, 0x6d); // 'm'
  view.setUint8(14, 0x74); // 't'
  view.setUint8(15, 0x20); // ' '
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM = 1
  view.setUint16(22, channels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);

  // data sub-chunk
  view.setUint8(36, 0x64); // 'd'
  view.setUint8(37, 0x61); // 'a'
  view.setUint8(38, 0x74); // 't'
  view.setUint8(39, 0x61); // 'a'
  view.setUint32(40, totalPcmBytes, true);

  return header;
}

export function createWavBlob(
  pcmChunks: Uint8Array[],
  sampleRate = 16000,
  channels = 1,
  bitsPerSample = 16,
): Blob {
  let totalPcmBytes = 0;
  for (let i = 0; i < pcmChunks.length; i++) {
    totalPcmBytes += pcmChunks[i].length;
  }

  const header = createWavHeader(
    totalPcmBytes,
    sampleRate,
    channels,
    bitsPerSample,
  );
  const headerUint8 = new Uint8Array(header);
  return new Blob([headerUint8, ...pcmChunks] as unknown as BlobPart[], {
    type: 'audio/wav',
  });
}
