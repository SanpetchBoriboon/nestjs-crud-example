import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guards';
import { NotesTransformInterceptor } from './interceptors/notes.interceptor';

@UseGuards(JwtAuthGuard)
@Controller()
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseInterceptors(NotesTransformInterceptor)
  @Post('note')
  create(@Body() createNoteDto: CreateNoteDto, @Request() { user }: any) {
    return this.notesService.create(createNoteDto, user);
  }

  @Get('notes')
  findAll(@Request() { user }: any) {
    return this.notesService.findAll(user);
  }

  @Get('note/:id')
  findOne(@Param('id') id: string, @Request() { user }: any) {
    return this.notesService.findOne(+id, user);
  }

  @Patch('note/:id/update')
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Request() { user }: any,
  ) {
    return this.notesService.update(+id, updateNoteDto, user);
  }

  @Delete('note/:id/delete')
  remove(@Param('id') id: string, @Request() { user }: any) {
    return this.notesService.remove(+id, user);
  }
}
