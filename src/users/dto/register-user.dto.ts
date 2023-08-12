import { IsEmail, IsNotEmpty, Matches, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString({ message: 'Email should be a string' })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password should contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long',
    },
  )
  password: string;
}
