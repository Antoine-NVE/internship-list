import { Component } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NewContact } from '../../../models/contact.model';
import { ContactService } from '../../../services/contact.service';

@Component({
    selector: 'app-contact-add',
    standalone: true,
    imports: [ContactFormComponent, RouterLink],
    templateUrl: './contact-add.component.html',
    styleUrl: './contact-add.component.css',
})
export class ContactAddComponent {
    constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) {}

    handleContact(contact: NewContact) {
        this.contactService.create(contact).subscribe({
            next: (message) => this.router.navigate(['../'], { relativeTo: this.route }),
            error: (error) => console.error(error),
        });
    }
}
