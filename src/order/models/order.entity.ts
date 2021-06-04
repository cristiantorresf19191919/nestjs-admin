import { UseGuards } from "@nestjs/common";
import { Exclude, Expose } from "class-transformer";
import { AuthGuard } from "src/auth/auth.guard";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";

@UseGuards(AuthGuard)
@Entity('orders')
export class Order{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @Exclude()
    first_name:string;
    
    @Column()
    @Exclude()
    last_name:string;

    @Column()
    email:string;

    @CreateDateColumn()
    created_at:Date;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    order_items:OrderItem[];

    @Expose()
    get fullName(): string {
        return `${this.first_name} ${this.last_name}`
    }

    @Expose()
    get total(){
        return this.order_items.reduce((sum,cv) => sum + cv.quantity * cv.price ,0);
    }

}