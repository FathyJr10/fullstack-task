import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { MemberService } from './members.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailUnique implements ValidatorConstraintInterface {
  constructor(private readonly memberService: MemberService) {}

  async validate(email: string, args: ValidationArguments) {
    const member = await this.memberService.findByEmail(email);
    return !member; // returns true if email is not taken
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email ($value) is already taken';
  }
}
