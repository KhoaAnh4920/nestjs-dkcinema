import { MigrationInterface, QueryRunner } from 'typeorm';

export class createMovieTheaterTable1669871220311
  implements MigrationInterface
{
  name = 'createMovieTheaterTable1669871220311';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`Movietheater\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`cityCode\` int NULL, \`districtCode\` int NULL, \`wardCode\` int NULL, \`address\` varchar(255) NOT NULL, \`phone_number\` varchar(11) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`isDelete\` tinyint NULL DEFAULT 0, UNIQUE INDEX \`phone_unique\` (\`phone_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`ImageMovieTheater\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NULL DEFAULT 1, \`url\` varchar(255) NULL, \`public_id\` varchar(255) NULL, \`movieTheaterId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ImageMovieTheater\` ADD CONSTRAINT \`FK_84a7ff9b50d6456d9600a1fb46a\` FOREIGN KEY (\`movieTheaterId\`) REFERENCES \`Movietheater\`(\`id\`) ON DELETE CASCADE ON UPDATE RESTRICT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`ImageMovieTheater\` DROP FOREIGN KEY \`FK_84a7ff9b50d6456d9600a1fb46a\``,
    );
    await queryRunner.query(`DROP TABLE \`ImageMovieTheater\``);
    await queryRunner.query(`DROP INDEX \`phone_unique\` ON \`Movietheater\``);
    await queryRunner.query(`DROP TABLE \`Movietheater\``);
  }
}
