import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  RequestTimeoutException,
  UseGuards,
} from '@nestjs/common';
import { IndividualService } from './individual.service';
import { CreateIndividualDto } from './dtos/createIndividual.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { IndividualDocument } from 'src/entities/individual.entity';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { UpdateIndividualDto } from './dtos/updateIndividual.dto';
import { now } from 'mongoose';

@Controller('individual')
export class IndividualController {
  constructor(
    private readonly individualService: IndividualService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  async get(@Req() req: Request): Promise<IndividualDocument | undefined> {
    const individual = this.individualService.findByUserId(req.user['sub']);
    if (!individual) {
      throw new BadRequestException('Profile not found');
    }
    return individual;
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  async create(
    @Body() createIndividualDto: CreateIndividualDto,
    @Req() req: Request,
  ): Promise<IndividualDocument | undefined> {
    const user = await this.userService.findById(req.user['sub']);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    const individual = await this.individualService.findByUserId(
      req.user['sub'],
    );
    if (individual) {
      throw new ConflictException(
        'This account already has an individual profile',
      );
    }
    createIndividualDto.user = req.user['sub'];
    createIndividualDto.isPrivate = true;
    createIndividualDto.createDate = now();
    return await this.individualService.create(createIndividualDto);
  }

  @UseGuards(AccessTokenGuard)
  @Put()
  async update(
    @Body() updateIndividualDto: UpdateIndividualDto,
    @Req() req: Request,
  ) {
    const individual = await this.individualService.findByUserId(
      req.user['sub'],
    );
    if (!individual) {
      throw new BadRequestException('Profile not found');
    }
    updateIndividualDto.updateDate = now();
    return await this.individualService.update(
      individual.id,
      updateIndividualDto,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    const individual = await this.individualService.findById(id);
    if (!individual) {
      throw new BadRequestException('Profile not found');
    }
    const individual_match = await this.individualService.findByUserId(
      req.user['sub'],
    );
    if (!individual_match)
      throw new BadRequestException('Not profile found for that user');
    if (individual_match.id !== individual.id)
      throw new BadRequestException('A problem has ocurred during delete');
    try {
      await this.individualService.delete(id);
      return individual;
    } catch (e) {
      throw new RequestTimeoutException('Timeout error on deleting profile', {
        cause: e,
      });
    }
  }
}
