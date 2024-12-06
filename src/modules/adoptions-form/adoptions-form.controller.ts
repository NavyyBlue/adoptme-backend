import { Body, Controller, Post } from '@nestjs/common';
import { AdoptionsFormService } from './adoptions-form.service';
import { CreateAdoptionFormsDto } from './dto/create-adoption-forms.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller('adoptions-form')
export class AdoptionsFormController {
    constructor(private readonly adoptionFormService: AdoptionsFormService) {}

    @ApiTags('adoptions-form')
    @Post("create")
    @ApiOperation({ summary: 'Create a new adoption form' })
    @ApiBody({ type: CreateAdoptionFormsDto })
    async createAdoptionForm(
        @Body() adoptionForm: Partial<CreateAdoptionFormsDto>
    ) {
        return this.adoptionFormService.createAdoptionForm(adoptionForm);
    }

}
