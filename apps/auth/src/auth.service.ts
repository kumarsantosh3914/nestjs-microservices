import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { UserAuthenticationSchema } from './dto/base-user.dto'; 
import * as jwt from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async registerUser(userDto: UserAuthenticationSchema): Promise<string> {
    // Check if the user with the provided email already exists
    const existingUser = await this.authRepository.findUserByEmail(
      userDto.email,
    );
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create the user
    const newUser = await this.authRepository.createUser(userDto);
    return `User ${newUser.username} successfully registered`;
  }

  async loginUser(email: string, password: string): Promise<string> {
    // Find the user by email and password
    const user = await this.authRepository.findUserByEmailAndPassword(
      email,
      password,
    );
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id,
        email: user.email,
      },
      'secretKey',
      { expiresIn: '1h' },
    );

    return token; // Return the generated token
  }

  // You can define more methods for authentication, such as logout, password reset, etc.
}
