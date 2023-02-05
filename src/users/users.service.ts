import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private hashSecret: number;
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    const hashSecret = +this.configService.get<string>('HASH_SECRET');
    this.hashSecret = hashSecret;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        this.hashSecret,
      );
      createUserDto.password = hashedPassword;
      const user = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new ConflictException();
    }
  }

  findAll(): Promise<User[]> {
    try {
      return this.usersRepository.find();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOneUser(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { username } });
    return user;
  }

  findOne(id: number): Promise<User> {
    try {
      return this.usersRepository.findOneBy({ id: id });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.password) {
        const hashPassword = await bcrypt.hash(
          updateUserDto.password,
          this.hashSecret,
        );
        updateUserDto.password = hashPassword;
      }
      return this.usersRepository.update(id, updateUserDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
