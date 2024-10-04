export class UploadResponseDto {
  status: number;
  data: {
    Especie: string;
    Raza: string;
    Edad: number;
    Peso: number;
    Color: string;
    Tamaño: string;
  };
  imageUrl: string;
}