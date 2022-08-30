import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Driver } from './driver.entity';

@Entity({name: 'company'})
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: true, unique: true })
    name: string;

    @Column({ type: 'varchar', nullable: false, })
    city: string;

    @Column({ type: 'varchar', nullable: false,  default: 'active' })
    status: string;

    @Column({ type: 'varchar',  nullable: false, name: 'plan_type', default: 'prepaid' })
    planType: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creation_date: Date;

    @OneToMany(() => Driver, (driver) => driver.company)
    drivers: Driver[];

}
