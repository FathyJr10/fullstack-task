import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn() //this makes id auto-increment
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  age: number;

  @Column()
  mobileNumber: string;

  @Column({ default: 'Unclaimed' })
  status: string; // Unclaimed, First Contact, Preparing Work Offer, Send to Therapist
}
