import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { Photo } from './entities/photo.entity';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { IndividualModule } from './individual/individual.module';
import { Individual } from './entities/individual.entity';
import { Company } from './entities/company.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    AuthModule,
    CompaniesModule,
    IndividualModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
