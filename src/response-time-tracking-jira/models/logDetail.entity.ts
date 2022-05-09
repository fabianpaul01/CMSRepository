import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class LogDetail {

  @PrimaryGeneratedColumn()
  id:number
  
  @Column()
  issueKey: string;

  @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
  public updated_at: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

//   @Transform(date1 => moment(date1).format('DD/MM/YY'))
//   @Column() 
//   date1:Date; 
}