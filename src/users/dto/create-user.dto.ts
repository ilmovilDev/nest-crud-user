import { ApiProperty } from "@nestjs/swagger";
import { Matches, IsString, MinLength, IsMongoId, MaxLength, IsEmail, IsOptional, IsNumberString, IsEnum, IsUrl, IsBoolean } from "class-validator";
import { Role } from "src/common";
import { User } from "../schema/user.schema";

export class MongoIdDto {
    @ApiProperty({
        example: '652c2a4f7ac7bcbba1e04ac9',
        description: 'Mongo Use ID.'
    })
    @IsMongoId()
    id: string;
}

export class EmailDto {
    @ApiProperty({
        example: 'adumbledore@hogwarts.magic',
        description: 'User Email.',
    })
    @IsEmail({}, { message: 'This is not a valid email.' })
    @MaxLength(50, { message: 'Email should have at most 50 characters.' })
    email: string;
}

export class BaseUserDto extends EmailDto {
    @ApiProperty({
        example: 'Albus',
        description: 'First name.'
    })
    @IsString({ message: 'First name should be a string.' })
    @MinLength(3, { message: 'First name must have at least 3 characters.' })
    @MaxLength(18, { message: 'First name cannot have more than 18 characters.' })
    firstName: string;

    @ApiProperty({
        example: 'Dumbledor',
        description: 'Last name.'
    })
    @IsString({ message: 'Last name should be a string.' })
    @MinLength(3, { message: 'Last name must have at least 3 characters.' })
    @MaxLength(18, { message: 'Last name cannot have more than 18 characters.' })
    lastName: string;

    @ApiProperty({
        description: 'User Role (ADMIN_ROLE or USER_ROLE).',
        enum: Role,
        default: Role.USER_ROLE,
    })
    @IsOptional()
    @IsEnum(Role, { message: `Invalid user role. Choose from ${Role.ADMIN_ROLE} or ${Role.USER_ROLE}.` })
    role?: Role = Role.USER_ROLE;
}

export class CreateUserDto extends BaseUserDto {
    @ApiProperty({
        example: 'Lc140791',
        description: 'User Password.'
    })
    @IsString({ message: 'Password should be a string.' })
    @MinLength(8, { message: 'Password should have at least 8 characters.' })
    @MaxLength(12, { message: 'Password should have at most 12 characters.' })
    @Matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%*&]).*$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@, #, $, %, *, &).',
    })
    password: string;

    @ApiProperty({
        example: 'https://example.com/image.jpg',
        description: 'Photo URL'
    })
    @IsOptional()
    @IsUrl()
    imagen?: string;
}

export class CreatedUserDto {
    @ApiProperty({
        example: '652c2a4f7ac7bcbba1e04ac9',
        description: 'Mongo Use ID.'
    })
    @IsMongoId()
    uid: string

    @ApiProperty({
        example: 'Albus',
        description: 'First name.'
    })
    firstName: string;

    @ApiProperty({
        example: 'Dumbledor',
        description: 'Last name.'
    })
    lastName: string;

    @ApiProperty({
        example: 'adumbledore@hogwarts.magic',
        description: 'User Email.',
    })
    email: string;

    @ApiProperty({
        example: 'https://example.com/image.jpg',
        description: 'Photo URL'
    })
    imagen: string;

    @ApiProperty({
        example: 'ADMIN_ROLE',
        description: 'User Role (ADMIN_ROLE or USER_ROLE).',
        enum: Role,
    })
    role: Role
}

export class FindAllDto {
    @ApiProperty({
        example: '10',
        description: 'Maximum number of items per page. Example: 10',
    })
    @IsNumberString()
    limit: number;

    @ApiProperty({
        example: '0',
        description: 'Index of the first item to retrieve. Example: 0',
    })
    @IsNumberString()
    from: number;
}

export class UserResponseDto {

    @ApiProperty({
        example: '652c2a4f7ac7bcbba1e04ac9',
        description: 'Mongo Use ID.'
    })
    uid: string;

    @ApiProperty({
        example: 'Albus',
        description: 'First name.'
    })
    firstName: string;

    @ApiProperty({
        example: 'Dumbledor',
        description: 'Last name.'
    })
    lastName: string;

    @ApiProperty({
        example: 'adumbledore@hogwarts.magic',
        description: 'User Email.',
    })
    email: string;

    @ApiProperty({
        example: 'https://example.com/image.jpg',
        description: 'Photo URL'
    })
    imagen?: string;

    @ApiProperty({
        description: 'User Role (ADMIN_ROLE or USER_ROLE).',
        enum: Role
    })
    role: Role;

}

export class FindAllResponseDto {
    total: number;
    users: User[];
}
