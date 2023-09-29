import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  RequestTimeoutException,
  UseGuards,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompanyDocument } from 'src/entities/company.entity';
import { UsersService } from 'src/users/users.service';
import { now } from 'mongoose';
import { CreateCompanyDto } from './dtos/createCompany.dto';
import { CATEGORY } from 'src/common/enum/category.enum';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { UpdateCompanyDto } from './dtos/updateCompany.dto';
import { Request } from 'express';

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companyService: CompaniesService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  async get(@Req() req: Request): Promise<CompanyDocument | undefined> {
    const company = await this.companyService.getByUserId(req.user['sub']);
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
    @Req() req: Request,
  ): Promise<CompanyDocument | undefined> {
    const user = await this.userService.findById(req.user['sub']);
    if (!user) throw new NotFoundException('User not found');
    const company = await this.companyService.getByUserId(user.id);

    if (company) throw new ConflictException('This user already has a company');
    createCompanyDto.user = user.id;
    createCompanyDto.createDate = now();
    // createCompanyDto.category = CATEGORY.ANIMALS;
    createCompanyDto.validated = true;
    return await this.companyService.create(createCompanyDto);
  }

  @UseGuards(AccessTokenGuard)
  @Put()
  async update(
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Req() req: Request,
  ) {
    const company = await this.companyService.getByUserId(req.user['sub']);
    if (!company) throw new NotFoundException('Company not found');
    updateCompanyDto.updateDate = now();
    return await this.companyService.update(company.id, updateCompanyDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    const company = await this.companyService.getById(id);
    if (!company) throw new NotFoundException('Company not found');
    const company_match = await this.companyService.getByUserId(
      req.user['sub'],
    );
    if (!company_match)
      throw new BadRequestException('Not company found for that user');
    if (company.id !== company_match.id)
      throw new BadRequestException('A problem ocurred during request');
    try {
      return await this.companyService.delete(id);
    } catch (e) {
      throw new RequestTimeoutException('Timeout error on deleting profile', {
        cause: e,
      });
    }
  }
}
