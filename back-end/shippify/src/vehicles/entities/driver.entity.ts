import { PrimaryGeneratedColumn, Column, Entity, OneToMany, JoinColumn, ManyToOne, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Company } from './company.entity';
import { Vehicle } from './vehicle.entity';

@Entity({name: "driver"})
export class Driver {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', name: 'company_id', nullable: true })
    companyId: number;

    @Column({ type: 'int', nullable: true, })
    city: number;

    @Column({ type: 'varchar', length: 100, name: "first_name", nullable: false })
    firstName: string;

    @Column({ type: 'varchar', length: 100, name: 'last_name', nullable: true })
    lastName: string;

    @Column({ type: 'varchar', unique: true, length: 100, name: 'email', nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 20, name: 'phone', nullable: false })
    phone: string;

    @Column({ type: 'varchar', length: 200, nullable: true, name: 'avatar_url' })
    avatarUrl: string;

    @Column({ type: 'varchar', length: 20, nullable: false, })
    status: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creation_date: Date;

    @ManyToOne(() => Company, (company) => company.drivers)
    @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
    company: Company

    @OneToMany(() => Vehicle, (vehicle) => vehicle.driver)
    vehicles: Vehicle[];

}
