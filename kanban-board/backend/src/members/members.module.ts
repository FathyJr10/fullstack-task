import { Module } from '@nestjs/common';
import { MemberController } from './members.controller';
import { MemberService } from './members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './members.entity';
import { IsEmailUnique } from './emailValidator';

@Module({
  imports: [TypeOrmModule.forFeature([Member])], // Register the Member entity here
  controllers: [MemberController],
  providers: [MemberService, IsEmailUnique],
})
export class MembersModule {}
