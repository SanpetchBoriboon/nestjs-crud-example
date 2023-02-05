import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    private readonly configService: ConfigService,
  ) {}
  async create(createNoteDto: CreateNoteDto, user: User) {
    try {
      const note = this.notesRepository.create({ ...createNoteDto, user });
      return await this.notesRepository.save(note);
    } catch (error) {
      throw new ConflictException();
    }
  }

  async findAll(user: User) {
    try {
      const notes = await this.notesRepository.find({ where: { user } });
      return notes;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number, user: User) {
    try {
      const note = await this.notesRepository.findOne({ where: { user, id } });
      return note;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, user: User) {
    let note = await this.findOne(id, user);
    try {
      if (updateNoteDto.tittle) {
        note.tittle = updateNoteDto.tittle;
      }
      if (updateNoteDto.note) {
        note.note = updateNoteDto.note;
      }

      note.is_active = updateNoteDto.is_active ? true : false;

      note.update_at = new Date();

      await this.notesRepository.save(note);
      return note;
    } catch (error) {
      throw new ConflictException();
    }
  }

  async remove(id: number, user: User) {
    try {
      let note = await this.findOne(id, user);
      await this.notesRepository.delete(id);
      return note;
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
