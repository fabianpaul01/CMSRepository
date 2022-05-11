import { Entity, Column, PrimaryGeneratedColumn, OneToMany, UpdateDateColumn, CreateDateColumn, PrimaryColumn, Generated } from 'typeorm';

@Entity()
export class JiraIssue {

  @Column({
    default:'',
  })
  summary: string;

  @PrimaryColumn()
  issueKey: string;

  @Column({
    type: 'json',
    array: false,
    nullable: false,
  })
  changelog: Array<{}>;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
  public updated_at: Date;
}


