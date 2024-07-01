import { Contact } from './contact.model';

export enum CompanyStatus {
    Waiting = 'waiting',
    Declined = 'denied',
    Accepted = 'accepted',
}

export interface NewCompany {
    name: string;
    discovery: string;
    status: CompanyStatus;
}

export interface Company extends NewCompany {
    _id: string;
    contacts: Contact[];
}
