import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Company, NewCompany } from '../../models/company.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-company-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './company-form.component.html',
    styleUrl: './company-form.component.css',
})
export class CompanyFormComponent implements OnInit {
    // Entrée pour une update
    @Input()
    public company?: Company;

    // Sortie pour une update
    @Output()
    public companyEmitted = new EventEmitter<Company>();

    // Sortie pour un ajout
    @Output()
    public newCompanyEmitted = new EventEmitter<NewCompany>();

    public companyForm: FormGroup = new FormGroup({
        name: new FormControl(''),
        discovery: new FormControl(''),
        status: new FormControl('En attente'),
    });

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

            // On envoie l'entreprise au component parent
            this.companyEmitted.emit(this.company);
        } else {
            // Dans le cas d'un ajout, on crée une nouvelle entreprise (sans id ni contacts)
            const company: NewCompany = this.companyForm.value;

            // On envoie l'entreprise au component parent
            this.newCompanyEmitted.emit(company);
        }
    }
}
