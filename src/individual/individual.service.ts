import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Individual, IndividualDocument } from 'src/entities/individual.entity';
import { ICreateIndividual } from 'src/individual/interfaces/createIndividual.interface';
import { IUpdateIndividual } from './interfaces/updateIndividual.interface';

@Injectable()
export class IndividualService {
  constructor(
    @InjectModel(Individual.name) private individualModel: Model<Individual>,
  ) {}

  async create(
    createIndividualDto: ICreateIndividual,
  ): Promise<IndividualDocument | undefined> {
    return await this.individualModel.create(createIndividualDto);
  }

  async findByUserId(userId: string): Promise<IndividualDocument | undefined> {
    return await this.individualModel.findOne({ user: userId }).exec();
  }

  async update(updateIndividualDto: IUpdateIndividual) {
    return await this.individualModel.updateOne(updateIndividualDto);
  }

  async delete(id: string) {
    return await this.individualModel.findOneAndDelete({ id });
  }

  async findById(id: string) {
    return await this.individualModel.findById(id);
  }
}
