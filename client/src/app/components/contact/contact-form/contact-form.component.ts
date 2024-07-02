import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact, NewContact } from '../../../models/contact.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-contact-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './contact-form.component.html',
    styleUrl: './contact-form.component.css',
})
export class ContactFormComponent {
    // Entrée pour une update
    @Input()
    public contact?: Contact;

    // Sortie pour une update
    @Output()
    public contactEmitted: EventEmitter<Contact> = new EventEmitter<Contact>();

    // Sortie pour un ajout
    @Output()
    public newContactEmitted: EventEmitter<NewContact> = new EventEmitter<NewContact>();

    public contactForm: FormGroup = new FormGroup({
        object: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required),
        content: new FormControl(''),
    });
    public object = this.contactForm.controls['object'];
    public date = this.contactForm.controls['date'];
    public content = this.contactForm.controls['content'];
    public isSubmitted: boolean = false;

    constructor(private route: ActivatedRoute) {}

    public contactFormSubmit() {
        this.isSubmitted = true;

        if (!this.object.errors && !this.date.errors) {
            if (this.contact) {
                // UPDATE
            } else {
                // Dans le cas d'un ajout, on crée un nouveau contact (sans id)
                const contact: NewContact = {
                    object: this.object.value,
                    date: this.date.value,
                    content: this.content.value,
                    companyId: this.route.snapshot.paramMap.get('id')!,
                };

                // On envoie le contact au composant parent
                this.newContactEmitted.emit(contact);
            }
        }
    }
}
