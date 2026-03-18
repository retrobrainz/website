export default interface Rom {
  id: number;
  gameId: number;
  name: string;
  filename: string;
  size: number;
  crc: string;
  md5: string;
  sha1: string;
  serial: string | null;
  disc: number | null;
  createdAt: string;
  updatedAt: string | null;
}
