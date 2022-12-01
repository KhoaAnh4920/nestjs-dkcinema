import { MigrationInterface, QueryRunner } from 'typeorm';

export class createSeetRoomTypeSeetTable1669890078508
  implements MigrationInterface
{
  name = 'createSeetRoomTypeSeetTable1669890078508';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`TypeSeet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`Seet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`posOfRow\` int NULL, \`posOfColumn\` int NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`typeSeetId\` int NULL, \`roomId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`Room\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`numberOfColumn\` int NULL, \`numberOfRow\` int NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`movieTheaterId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Seet\` ADD CONSTRAINT \`FK_65ace4f49428519de46367dd0a9\` FOREIGN KEY (\`typeSeetId\`) REFERENCES \`TypeSeet\`(\`id\`) ON DELETE CASCADE ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Seet\` ADD CONSTRAINT \`FK_746960e7b287398c2e16ad07781\` FOREIGN KEY (\`roomId\`) REFERENCES \`Room\`(\`id\`) ON DELETE CASCADE ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Room\` ADD CONSTRAINT \`FK_ba5c003d4a2a650cc4b39127c1e\` FOREIGN KEY (\`movieTheaterId\`) REFERENCES \`Movietheater\`(\`id\`) ON DELETE CASCADE ON UPDATE RESTRICT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Room\` DROP FOREIGN KEY \`FK_ba5c003d4a2a650cc4b39127c1e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Seet\` DROP FOREIGN KEY \`FK_746960e7b287398c2e16ad07781\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Seet\` DROP FOREIGN KEY \`FK_65ace4f49428519de46367dd0a9\``,
    );
    await queryRunner.query(`DROP TABLE \`Room\``);
    await queryRunner.query(`DROP TABLE \`Seet\``);
    await queryRunner.query(`DROP TABLE \`TypeSeet\``);
  }
}
