import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/company.model';
import { CompanyFormComponent } from '../company-form/company-form.component';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../services/contact.service';

@Component({
    selector: 'app-company-edit',
    standalone: true,
    imports: [RouterLink, CompanyFormComponent, CommonModule],
    templateUrl: './company-edit.component.html',
    styleUrl: './company-edit.component.css',
})
export class CompanyEditComponent implements OnInit {
    public company!: Company;

    constructor(private route: ActivatedRoute, private companyService: CompanyService, private contactService: ContactService, private router: Router) {}

    ngOnInit(): void {
        const id: string = this.route.snapshot.paramMap.get('id')!;

        this.companyService.readOne(id).subscribe({
            next: (company) => (this.company = company),
            error: (error) => this.router.navigate(['entreprise']),
        });
    }

    // Permet de supprimer un contact
    public deleteContact(id: string) {
        this.contactService.delete(id).subscribe({
            next: (message) => (this.company.contacts = this.company.contacts.filter((contact) => contact._id !== id)),
            error: (error) => console.error(error),
        });
    }

    // Permet de récupérer l'entreprise modifiée
    public handleCompany(company: Company) {
        this.companyService.update(company).subscribe({
            next: (message) => this.router.navigate(['']),
            error: (error) => console.error(error),
        });
    }
}
