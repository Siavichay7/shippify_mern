import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Driver } from './driver.entity';

@Entity({name: 'company'})
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    city: string;

    @Column({ type: 'varchar' })
    status: string;

    @Column({ type: 'varchar', name: 'plan_type' })
    planType: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creation_date: Date;

    @OneToMany(() => Driver, (driver) => driver.company)
    drivers: Driver[];

}
