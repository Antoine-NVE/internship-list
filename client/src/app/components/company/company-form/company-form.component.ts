import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Company, NewCompany } from '../../../models/company.model';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { companyStatusValidator } from '../../../validators/company-status.validator';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-company-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './company-form.component.html',
    styleUrl: './company-form.component.css',
})
export class CompanyFormComponent implements OnInit, AfterViewInit {
    @ViewChild('inputFocus')
    inputFocus!: ElementRef<HTMLInputElement>;

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
        name: new FormControl('', Validators.required),
        discovery: new FormControl('', Validators.required),
        status: new FormControl('status', companyStatusValidator()),
    });
    public name = this.companyForm.controls['name'];
    public discovery = this.companyForm.controls['discovery'];
    public status = this.companyForm.controls['status'];
    public isSubmitted: boolean = false;

    ngOnInit(): void {
        if (this.company) {
            this.companyForm.patchValue({
                name: this.company.name,
                discovery: this.company.discovery,
                status: this.company.status,
            });
        }
    }

    ngAfterViewInit(): void {
        this.inputFocus.nativeElement.focus();
    }

    public companyFormSubmit() {
        this.isSubmitted = true;

        if (!this.name.errors && !this.discovery.errors && !this.status.errors) {
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
}
