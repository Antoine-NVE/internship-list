import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Contact, NewContact } from '../models/contact.model';

@Injectable({
    providedIn: 'root',
})
export class ContactService {
    private readonly API_URL = 'http://localhost:3000/api/contact/';

    constructor(private http: HttpClient) {}

    public create(contact: NewContact): Observable<{ message: string }> {
        return this.http
            .post<{ message: string }>(
                this.API_URL + contact.companyId,
                contact
            )
            .pipe(catchError(this.handleError));
    }

    public readOne(id: string): Observable<Contact> {
        return this.http
            .get<Contact>(this.API_URL + id)
            .pipe(catchError(this.handleError));
    }

    public update(contact: Contact): Observable<{ message: string }> {
        return this.http
            .put<{ message: string }>(this.API_URL + contact._id, contact)
            .pipe(catchError(this.handleError));
    }

    public delete(id: string): Observable<{ message: string }> {
        return this.http
            .delete<{ message: string }>(this.API_URL + id)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('Erreur client ou réseau : ' + error.error);
        } else {
            console.error('Erreur serveur : ' + error.error);
        }

        return throwError(() => 'Une erreur est survenue.');
    }
}
