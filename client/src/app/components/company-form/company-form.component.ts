import { Component, Input, OnInit } from '@angular/core';
import { Company, NewCompany } from '../../models/company.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service';

@Component({
    selector: 'app-company-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './company-form.component.html',
    styleUrl: './company-form.component.css',
})
export class CompanyFormComponent implements OnInit {
    @Input()
    public company!: Company;

    public companyForm: FormGroup = new FormGroup({
        name: new FormControl(''),
        discovery: new FormControl(''),
        status: new FormControl('En attente'),
    });

    constructor(private companyService: CompanyService) {}

    ngOnInit(): void {
        if (this.company) {
            this.companyForm.patchValue({
                name: this.company.name,
                discovery: this.company.discovery,
                status: this.company.status,
            });
        }
    }

    public companyFormSubmit() {
        if (this.company) {
            // Dans le cas d'une update, on modifie l'entreprise existante
            this.company.name = this.companyForm.value.name;
            this.company.discovery = this.companyForm.value.discovery;
            this.company.status = this.companyForm.value.status;

            this.companyService.update(this.company).subscribe({
                next: (message) => console.log(message),
                error: (error) => console.error(error),
            });
        } else {
            // Dans le cas d'un ajout, on crée une nouvelle entreprise (sans id ni contacts)
            const company: NewCompany = this.companyForm.value;

            this.companyService.create(company).subscribe({
                next: (message) => console.log(message),
                error: (error) => console.error(error),
            });
        }
    }
}
