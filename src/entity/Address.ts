import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Contact } from "./Contact";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  addressId: number;

  @Column({ type: "enum", enum: ["Canada", "USA"], nullable: true })
  country: string;

  @Column({ length: 5, nullable: true })
  title: string;

  @Column({ type: "varchar", length: 15, nullable: true })
  postalCode: string;

  @Column({ type: "varchar", length: 15, nullable: true })
  phone: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  province: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  city: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  street1: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  street2: string;

  @Column({ type: "varchar", length: 250, nullable: true })
  email: string;

  @ManyToOne(() => Contact, (contact) => contact.address, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "ContactId" })
  contact: Contact;
}
