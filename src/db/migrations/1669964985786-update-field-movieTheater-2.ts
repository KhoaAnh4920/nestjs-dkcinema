import { MigrationInterface, QueryRunner } from "typeorm";

export class updateFieldMovieTheater21669964985786 implements MigrationInterface {
    name = 'updateFieldMovieTheater21669964985786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Movietheater\` CHANGE \`name\` \`name\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`Movietheater\` CHANGE \`phone_number\` \`phone_number\` varchar(11) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Movietheater\` CHANGE \`phone_number\` \`phone_number\` varchar(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Movietheater\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
    }

}
