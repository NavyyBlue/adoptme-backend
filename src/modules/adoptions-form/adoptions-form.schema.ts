import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class AdoptionForms{
    @ApiProperty()
    adoptionFormId: string;
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    lastName: string;
    
    @ApiProperty()
    email: string;
    
    @ApiProperty()
    phone: string;
    
    @ApiProperty()
    address: string;
    
    @ApiProperty()
    dni: string;

    @ApiProperty()
    termsAndConditions: boolean;
    
    @ApiProperty()
    petId: string;

    
    constructor(partial: Partial<AdoptionForms>) {
        Object.assign(this, partial);
        this.adoptionFormId = uuidv4();
    }
}