import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength } from 'class-validator';
import { Role } from 'src/common';

export class UpdateUserDto {
    @ApiProperty({
        example: 'Albus',
        description: 'First name.'
    })
    @IsOptional()
    @IsString({ message: 'First name should be a string.' })
    @MinLength(3, { message: 'First name must have at least 3 characters.' })
    @MaxLength(18, { message: 'First name cannot have more than 18 characters.' })
    firstName?: string;

    @ApiProperty({
        example: 'Dumbledor',
        description: 'Last name.'
    })
    @IsOptional()
    @IsString({ message: 'Last name should be a string.' })
    @MinLength(3, { message: 'Last name must have at least 3 characters.' })
    @MaxLength(18, { message: 'Last name cannot have more than 18 characters.' })
    lastName?: string;

    @ApiProperty({
        example: 'Lc140791',
        description: 'User Password.'
    })
    @IsOptional()
    @IsString({ message: 'Password should be a string.' })
    @MinLength(8, { message: 'Password should have at least 8 characters.' })
    @MaxLength(12, { message: 'Password should have at most 12 characters.' })
    @Matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%*&]).*$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@, #, $, %, *, &).',
    })
    password?: string;

    @ApiProperty({
        example: 'https://example.com/image.jpg',
        description: 'Photo URL'
    })
    @IsOptional()
    @IsUrl()
    imagen?: string;

}
