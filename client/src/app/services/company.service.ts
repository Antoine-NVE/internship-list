import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company, NewCompany } from '../models/company.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CompanyService {
    private readonly API_URL = 'http://localhost:3000/api/company/';

    constructor(private http: HttpClient) {}

    public create(company: NewCompany): Observable<{ message: string }> {
        return this.http
            .post<{ message: string }>(this.API_URL, company)
            .pipe(catchError(this.handleError));
    }

    public readAll(): Observable<Company[]> {
        return this.http
            .get<Company[]>(this.API_URL)
            .pipe(catchError(this.handleError));
    }

    public readOne(id: string): Observable<Company> {
        return this.http
            .get<Company>(this.API_URL + id)
            .pipe(catchError(this.handleError));
    }

    public update(company: Company): Observable<{ message: string }> {
        return this.http
            .put<{ message: string }>(this.API_URL + company._id, company)
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
