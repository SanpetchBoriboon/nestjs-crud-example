import { IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  id: number;
  @IsNotEmpty()
  tittle: string;

  @IsNotEmpty()
  note: string;

  @IsNotEmpty()
  is_active: boolean;

  @IsNotEmpty()
  create_at: Date;

  @IsNotEmpty()
  update_at: Date;
}
