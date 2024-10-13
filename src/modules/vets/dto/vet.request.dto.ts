import { IsNotEmpty, IsString } from "class-validator";

export class VetRequestDto {
    @IsString()
    @IsNotEmpty()
    place_id: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    link: string;

    @IsString()
    main_category: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}