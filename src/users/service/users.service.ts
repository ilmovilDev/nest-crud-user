import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, CreatedUserDto, FindAllDto, MongoIdDto, UserResponseDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ErrorManager, encryptPassword } from 'src/common';
import { User } from '../schema/user.schema';
import { FindAllResponse, IUser } from 'src/common/interfaces';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { };

  async create(body: CreateUserDto): Promise<UserResponseDto> {
    const { email, password } = body;
    try {
      // Check if a user with the same email already exists
      const emailExists = await this.userModel.findOne({ email });
      if (emailExists) {
        // If a user with the same email exists, throw a 'BAD_REQUEST' error
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'A user with the entered email already exists.'
        })
      }

      // Encrypt the user's password
      const encryptedPassword = await encryptPassword(password);

      // Create a new user document
      const createdUser = new this.userModel({ ...body, password: encryptedPassword });

      // Save the user document in the database
      await createdUser.save();

      // Return the adapted user data
      return this.adaptUserData(createdUser);
    } catch (error) {
      console.log(error);
      // If an unexpected error occurs, throw a signature error
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll(query: FindAllDto): Promise<FindAllResponse> {
    const { limit, from } = query;
    try {
      // Retrieve the total count of active users
      const [total, users]: [number, User[]] = await Promise.all([
        this.userModel.countDocuments({ status: true }),
        // Retrieve a list of active users with pagination
        this.userModel.find({ status: true })
          .skip(Number(from))
          .limit(Number(limit))
      ])

      // Return an object containing the total count and the list of users
      return {
        total,
        users
      };
    } catch (error) {
      console.log(error);
      // If an unexpected error occurs, throw a signature error
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne({ id }: MongoIdDto): Promise<UserResponseDto> {
    try {
      const user: User = await this.userModel.findById(id);
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `No user was found with the id: ${id}.`
        })
      }
      return this.adaptUserData(user);
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update({ id }: MongoIdDto, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const { firstName, lastName, password, imagen } = updateUserDto;
    try {
      const updateFields = { firstName, lastName, password, imagen };
      if (password) {
        updateFields.password = await encryptPassword(password);
      }
      const updatedUser = await this.userModel.findByIdAndUpdate(id, updateFields, { new: true });
      return this.adaptUserData(updatedUser);
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove({ id }: MongoIdDto): Promise<UserResponseDto> {
    try {
      const deletedUser: User = await this.userModel.findByIdAndUpdate(id, { status: false }, { new: true });
      if (!deletedUser) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `No user was found with the id: ${id}.`
        })
      }
      return this.adaptUserData(deletedUser);
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  adaptUserData(user: IUser | User): UserResponseDto {
    const { id, firstName, lastName, email, imagen, role } = user;
    return {
      uid: id,
      firstName,
      lastName,
      email,
      imagen,
      role
    }
  }
}
