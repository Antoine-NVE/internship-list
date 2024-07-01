import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company, CompanyStatus } from '../../models/company.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
    public companies: Company[] = [];

    constructor(private companyService: CompanyService) {}

    ngOnInit(): void {
        this.companyService.readAll().subscribe({
            next: (companies) => (this.companies = companies),
            error: (error) => console.error(error),
        });
    }

    // Permet de supprimer une entreprise
    public deleteCompany(id: string) {
        this.companyService.delete(id).subscribe({
            next: (message) => {
                // Après la suppression en base, on supprime l'entreprise de notre array, sans nouvelle requête
                this.companies = this.companies.filter(
                    (company) => company._id !== id
                );
                console.log(message);
            },
            error: (error) => console.error(error),
        });
    }

    // Permet de savoir le nombre de contacts
    public getNumberOfContacts(company: Company): number {
        return company.contacts.length;
    }

    // Permet de savoir si une company a des contacts
    public hasContacts(company: Company): boolean {
        return this.getNumberOfContacts(company) > 0;
    }

    // Permet d'obtenir une couleur de badge en fonction du status
    public getBadgeColor(
        status: CompanyStatus
    ): 'warning' | 'success' | 'danger' {
        if (status === 'denied') {
            return 'danger';
        }

        if (status === 'accepted') {
            return 'success';
        }

        return 'warning';
    }

    // Permet de couper le contenu trop long
    public getDisplayContent(content: string | undefined): string {
        if (content && content.length > 10) {
            return content.slice(0, 6) + '...';
        }
        return content ?? '';
    }
}
