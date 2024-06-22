export interface NewContact {
    object: string;
    date: Date;
    content?: string;
    companyId: string;
}

export interface Contact extends NewContact {
    _id: string;
}
