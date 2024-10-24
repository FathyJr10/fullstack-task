import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './members.entity';
import { CreateMemberDto } from './validateMember';
@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  // Method to create a new member
  async createMember(createMemberDto: CreateMemberDto): Promise<Member> {
    // Check if the email already exists
    const existingMember = await this.memberRepository.findOne({
      where: { email: createMemberDto.email },
    });
    if (existingMember) {
      throw new BadRequestException('Email already exists');
    }
    const newMember = this.memberRepository.create(createMemberDto);
    return await this.memberRepository.save(newMember);
  }
  // Find a member by email
  async findByEmail(email: string): Promise<Member | undefined> {
    return this.memberRepository.findOne({ where: { email } });
  }
  // Method to retrieve a specific member by ID
  async getMemberById(id: number): Promise<Member> {
    const member = await this.memberRepository.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return member;
  }

  // Method to retrieve all members
  async getAllMembers(): Promise<Member[]> {
    return await this.memberRepository.find();
  }
  async updateMember(id: number, updateData: Partial<Member>): Promise<Member> {
    const member = await this.memberRepository.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }

    // check for email uniqueness before updating
    if (updateData.email) {
      const existingMember = await this.memberRepository.findOne({
        where: { email: updateData.email },
      });
      if (existingMember && existingMember.id !== id) {
        throw new BadRequestException('Email already exists');
      }
    }

    // Update member details
    Object.assign(member, updateData);
    return this.memberRepository.save(member);
  }
  // Delete member by ID
  async deleteMember(id: number): Promise<void> {
    const member = await this.memberRepository.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    await this.memberRepository.delete(id); // Deletes the member
  }
}
