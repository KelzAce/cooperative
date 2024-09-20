import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCooperativeDto {
    @Transform((params) => {
        const value: string = params.value.trim();
        return value[0].toUpperCase() + value.slice(1).toLowerCase();
      })
      @IsNotEmpty()
      @IsString()
      cooperativename: string;
}
