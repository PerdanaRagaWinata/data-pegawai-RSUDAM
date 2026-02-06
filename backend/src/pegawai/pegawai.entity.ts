
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pegawai')
export class Pegawai {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama: string;

  @Column()
  nik: string;

  @Column()
  alamat: string;

  @Column()
  instalasi: string;
}