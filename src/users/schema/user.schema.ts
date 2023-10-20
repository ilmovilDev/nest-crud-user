import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/common';

@Schema({
    timestamps: true,
    versionKey: false
})
export class User {

    @Prop({
        unique: true,
        trim: true,
    })
    id?: string

    @Prop({
        required: true,
        trim: true,
    })
    firstName: string;

    @Prop({
        required: true,
        trim: true,
    })
    lastName: string;

    @Prop({
        required: true,
        unique: true,
        trim: true,
    })
    email: string;

    @Prop({
        required: true,
        trim: true,
    })
    password: string;

    @Prop({
        default: 'https://example.com/image.jpg'
    })
    imagen: string;

    @Prop({
        default: Role.USER_ROLE
    })
    role: Role;

    @Prop({
        default: true
    })
    status: boolean

}

export const UserSchema = SchemaFactory.createForClass(User);