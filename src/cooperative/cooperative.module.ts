import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CooperativeService } from './cooperative.service';
import { CooperativeController } from './cooperative.controller';
import { Cooperative, CooperativeSchema } from './schemas/cooperative.schema';

@Module({
  imports: [
    // Import MongooseModule and bind the Cooperative schema
    MongooseModule.forFeature([{ name: Cooperative.name, schema: CooperativeSchema }])
  ],
  providers: [CooperativeService],
  controllers: [CooperativeController],
  exports: [CooperativeService], // Export the service to be used in other modules
})
export class CooperativeModule {}
