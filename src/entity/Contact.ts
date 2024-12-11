import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Address } from "./Address";

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  contactId: number;

  @Column({ type: "date", nullable: true })
  birthDate: Date;

  @Column({ type: "varchar", length: 50, nullable: true })
  firstName: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  lastName: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  middleName: string;

  @OneToMany(() => Address, (address) => address.contact, {
    nullable: true,
    lazy: true,
    cascade: ["insert", "update", "remove"],
  })
  @JoinColumn({
    name: "ContactId",
  })
  address: Address[];
}
