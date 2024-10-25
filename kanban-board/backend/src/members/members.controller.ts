import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { MemberService } from './members.service';
import { CreateMemberDto } from './validateMember';
import { Member } from './members.entity';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

//@ApiTags('members')
@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // Endpoint to create a new member
  @ApiOperation({ summary: 'Create a new member' })
  @ApiResponse({
    status: 201,
    description: 'Member created successfully',
    type: Member,
  })
  @ApiResponse({ status: 400, description: 'the email is already registered' })
  @Post()
  async create(@Body() createMemberDto: CreateMemberDto) {
    return await this.memberService.createMember(createMemberDto);
  }
  @Get()
  @ApiOperation({ summary: 'Get all members' })
  @ApiResponse({ status: 200, description: '', type: Member })
  async getAllMembers(): Promise<Member[]> {
    return this.memberService.getAllMembers();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get member by ID' })
  @ApiResponse({ status: 200, description: 'Member found', type: Member })
  @ApiResponse({ status: 404, description: 'Member not found' })
  @ApiParam({
    name: 'id',
    description: 'ID of the member to retrieve',
    type: Number,
  })
  async getMemberById(@Param('id') id: number): Promise<Member> {
    return this.memberService.getMemberById(id);
  }
  @Put(':id')
  @ApiOperation({ summary: 'Update a member by ID' })
  @ApiResponse({
    status: 200,
    description: 'Member updated successfully',
    type: Member,
  })
  @ApiResponse({ status: 404, description: 'Member not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({
    name: 'id',
    description: 'ID of the member to update',
    type: Number,
  })
  async updateMember(
    @Param('id') id: number,
    @Body() updateData: Partial<Member>,
  ): Promise<Member> {
    return this.memberService.updateMember(id, updateData);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a member by ID' })
  @ApiResponse({ status: 204, description: 'Member deleted successfully' })
  @ApiResponse({ status: 404, description: 'Member not found' })
  @ApiParam({
    name: 'id',
    description: 'ID of the member to delete',
    type: Number,
  })
  async deleteMember(@Param('id') id: number): Promise<void> {
    return this.memberService.deleteMember(id);
  }
  @Delete()
  @ApiOperation({ summary: 'Delete all members' })
  @ApiResponse({ status: 204, description: 'All members deleted successfully' })
  @HttpCode(204) // Sets response status to 204 No Content
  async deleteAllMembers(): Promise<void> {
    await this.memberService.deleteAllMembers();
  }
}
