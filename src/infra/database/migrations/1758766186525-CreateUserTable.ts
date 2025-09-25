import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1758766186525 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Habilita a extensão uuid-ossp para gerar UUIDs automaticamente
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                
                "name" VARCHAR(100) NOT NULL,
                "email" VARCHAR(100) NOT NULL,
                "password" VARCHAR(255) NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),

                CONSTRAINT "PK_user" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_user_email" UNIQUE ("email")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "user"
        `);
  }
}
