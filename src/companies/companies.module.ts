import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/entities/user.entity';
import { Photo } from 'src/entities/photo.entity';
import { Company } from 'src/entities/company.entity';
import { Individual } from 'src/entities/individual.entity';

@Module({
  imports: [UsersModule],
  providers: [CompaniesService],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
