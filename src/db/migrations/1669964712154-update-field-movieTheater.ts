import { MigrationInterface, QueryRunner } from "typeorm";

export class updateFieldMovieTheater1669964712154 implements MigrationInterface {
    name = 'updateFieldMovieTheater1669964712154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Movietheater\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT '180 Cao Lỗ'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Movietheater\` CHANGE \`address\` \`address\` varchar(255) NOT NULL`);
    }

}
