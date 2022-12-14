import { PrimaryGeneratedColumn, Column, Entity, OneToMany, JoinColumn, ManyToOne, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Driver } from './driver.entity';

@Entity({name: "vehicle"})
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', name: 'driver_id', nullable: true })
    driverId: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    plate: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    model: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    type: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    capacity: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creation_date: Date;
    
    @ManyToOne(() => Driver, (driver) => driver.vehicles)
    @JoinColumn({ name: 'driver_id', referencedColumnName: 'id' })
    driver: Driver
}
