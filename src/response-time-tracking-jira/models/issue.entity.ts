import { Entity, Column, PrimaryGeneratedColumn, OneToMany, UpdateDateColumn, CreateDateColumn, PrimaryColumn, Generated } from 'typeorm';

@Entity()
export class JiraIssue {

  //@PrimaryGeneratedColumn()
  // @Column()
  // id: string;

  // @Column()
  // @Generated('increment')
  // id: number;

  @Column()
  summary: string;

  // @PrimaryColumn({
  //   name: 'issueKey',
  //   type: 'varchar',
  //   length: 32,
  //   default: ''
  // })
  @PrimaryColumn()
  issueKey: string;

  @Column({
    type: 'json',
    array: false,
    //default: () => "'[]'",
    nullable: false,
  })
  changelog: Array<{}>;

  // @Column()
  // status: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
  public updated_at: Date;

  // function cryptoRandomString(arg0: { length: number; type: string; }): string {
  //   throw new Error('Function not implemented.');
  // }
}


