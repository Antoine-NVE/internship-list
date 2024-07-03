import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../../models/contact.model';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
    selector: 'app-contact-edit',
    standalone: true,
    imports: [ContactFormComponent, RouterLink, CommonModule],
    templateUrl: './contact-edit.component.html',
    styleUrl: './contact-edit.component.css',
})
export class ContactEditComponent implements OnInit {
    public contact!: Contact;

    constructor(private contactService: ContactService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.contactService.readOne(this.route.snapshot.paramMap.get('id')!).subscribe({
            next: (contact) => (this.contact = contact),
            error: (error) => this.router.navigate(['']),
        });
    }

    handleContact(contact: Contact) {
        this.contactService.update(contact).subscribe({
            next: (message) => this.router.navigate(['/entreprise', contact.companyId]),
            error: (error) => console.error(error),
        });
    }
}
