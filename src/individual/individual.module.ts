import { Module } from '@nestjs/common';
import { IndividualService } from './individual.service';
import { IndividualController } from './individual.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { IndividualSchema } from 'src/entities/individual.entity';
import { UserSchema } from 'src/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: 'Individual', schema: IndividualSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [IndividualService],
  controllers: [IndividualController],
})
export class IndividualModule {}
