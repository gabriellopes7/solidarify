import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from 'src/entities/company.entity';
import { ICreateCompany } from './interfaces/createCompany.interface';
import { UpdateCompanyDto } from './dtos/updateCompany.dto';
import { IUpdateCompany } from './interfaces/updateCompany.interface';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async getByUserId(userId: string) {
    return await this.companyModel.findOne({ user: userId }).exec();
  }

  async create(createCompanyDto: ICreateCompany) {
    return await this.companyModel.create(createCompanyDto);
  }

  async update(id: string, updateCompanyDto: IUpdateCompany) {
    return await this.companyModel.findOneAndUpdate(
      { _id: id },
      updateCompanyDto,
      { new: true },
    );
  }

  async getById(id: string) {
    return await this.companyModel.findById(id);
  }

  async delete(id: string) {
    return await this.companyModel.findByIdAndDelete(id);
  }
}
