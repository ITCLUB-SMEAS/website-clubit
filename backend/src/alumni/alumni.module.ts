import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumniService } from './alumni.service';
import { AlumniController } from './alumni.controller';
import { Alumni } from './entities/alumni.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alumni])],
  controllers: [AlumniController],
  providers: [AlumniService],
  exports: [AlumniService],
})
export class AlumniModule {}
