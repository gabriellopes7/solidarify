import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { UsersModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/entities/user.entity';
import { Photo } from 'src/entities/photo.entity';
import { Company, CompanySchema } from 'src/entities/company.entity';
import { Individual } from 'src/entities/individual.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: 'Company', schema: CompanySchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [CompaniesService],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
