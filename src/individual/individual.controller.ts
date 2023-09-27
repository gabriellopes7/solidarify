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
    return await this.individualService.create(createIndividualDto);
  }

  @UseGuards(AccessTokenGuard)
  @Put()
  async update(
    @Body() updateIndividualDto: UpdateIndividualDto,
    @Req() req: Request,
  ) {
    const individual = this.individualService.findByUserId(req.user['sub']);
    if (!individual) {
      throw new BadRequestException('Profile not found');
    }
    return await this.individualService.update(updateIndividualDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const individual = this.individualService.findById(id);
    if (!individual) {
      throw new BadRequestException('Profile not found');
    }
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
