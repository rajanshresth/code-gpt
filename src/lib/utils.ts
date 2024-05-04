import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export async function* makeStreamAsyncIterator(
  reader: ReadableStreamDefaultReader<Uint8Array>
): AsyncGenerator<string, void, undefined> {
  const textDecoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    const chunkAsString = textDecoder.decode(value);
    if (done) break;
    yield chunkAsString;
  }
}
