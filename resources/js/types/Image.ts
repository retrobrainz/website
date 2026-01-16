export default interface Image {
  id: number;
  format: string;
  size: number;
  width: number;
  height: number;
  md5: string;
  url: string;
  createdAt: string;
  updatedAt: string | null;
}
