import { Contact } from './contact.model';

export enum CompanyStatus {
  Waiting = 'En attente',
  Declined = 'Refusé',
  Accepted = 'Accepté',
}

export interface Company {
  _id?: string;
  name: string;
  discovery: string;
  status: CompanyStatus;
  contacts?: Contact[];
}
