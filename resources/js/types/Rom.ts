export default interface Rom {
  id: number;
  gameId: number;
  name: string;
  filename: string;
  size: number;
  crc: string;
  md5: string | null;
  sha1: string | null;
  serial: string | null;
  disc: number | null;
  createdAt: string;
  updatedAt: string | null;
}
