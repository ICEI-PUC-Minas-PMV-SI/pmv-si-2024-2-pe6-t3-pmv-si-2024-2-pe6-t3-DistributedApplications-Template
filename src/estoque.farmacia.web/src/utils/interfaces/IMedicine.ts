import { Dayjs } from 'dayjs';

export interface IMedicine {
  id: string;
  name: string;
  batchId: string;
  manufacturerId: string;
  validity: Dayjs | null;
  image: string;
}
