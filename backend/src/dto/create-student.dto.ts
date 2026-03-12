import { IsEmail, IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsInt()
  @Min(0)
  age: number;
}
