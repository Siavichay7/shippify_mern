import { PrimaryGeneratedColumn, Column, Entity, OneToMany, JoinColumn, ManyToOne, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Company } from './company.entity';
import { Vehicle } from './vehicle.entity';

@Entity({name: "driver"})
export class Driver {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', name: 'company_id' })
    companyId: number;

    @Column({ type: 'varchar' })
    city: string;

    @Column({ type: 'varchar', name: "first_name" })
    firstName: string;

    @Column({ type: 'varchar', name: 'last_name' })
    lastName: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    phone: string;

    @Column({ type: 'varchar', name: 'avatar_url' })
    avatarUrl: string;

    @Column({ type: 'varchar' })
    status: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creation_date: Date;

    @ManyToOne(() => Company, (company) => company.drivers)
    @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
    company: Company

    @OneToMany(() => Vehicle, (vehicle) => vehicle.driver)
    vehicles: Vehicle[];

}
