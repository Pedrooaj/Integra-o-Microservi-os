import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  developer: string;

  @Column('text')
  publisher: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 3, scale: 2, default: 0 })
  discount: number;

  @Column({ default: true })
  isActive: boolean;

  @Column('simple-array')
  genres: string[];

  @Column('simple-array')
  platforms: string[];

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column('int', { default: 0 })
  totalReviews: number;

  @Column('decimal', { precision: 3, scale: 2, default: 0 })
  averageRating: number;

  @Column('date')
  releaseDate: Date;

  @Column({ nullable: true })
  coverImage: string;

  @Column('simple-array', { nullable: true })
  screenshots: string[];

  @Column('text', { nullable: true })
  systemRequirements: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  get discountedPrice(): number {
    return this.price - (this.price * this.discount) / 100;
  }

  get isOnSale(): boolean {
    return this.discount > 0;
  }
}