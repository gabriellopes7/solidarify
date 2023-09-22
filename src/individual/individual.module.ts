import { Module } from '@nestjs/common';
import { IndividualService } from './individual.service';

@Module({
  providers: [IndividualService]
})
export class IndividualModule {}
