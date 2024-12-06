import { Injectable } from '@nestjs/common';
import { AdoptionForms } from './adoptions-form.schema';
import { FirebaseRepository } from '@data/firebase/firebase.repository';
import { COLLECTIONS } from 'src/constants/collection.constants';


@Injectable()
export class AdoptionsFormService {
    private adoptionFormsCollection = COLLECTIONS.ADOPTION_FORMS;

    constructor(
        private firebaseRepository: FirebaseRepository<AdoptionForms>
    ) {}

    async createAdoptionForm(adoptionFormData: Partial<AdoptionForms>) {
        const adoptionForm = new AdoptionForms(adoptionFormData);
        return this.firebaseRepository.create(this.adoptionFormsCollection, adoptionForm.adoptionFormId, adoptionForm);
    }
}
