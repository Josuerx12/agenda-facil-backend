import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomerTable1758766453894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE users (
                id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                email text NOT NULL,
                password text,         
                name text,
                is_super_admin boolean DEFAULT false,
                is_active boolean DEFAULT true,
                created_at timestamptz DEFAULT now(),
                updated_at timestamptz DEFAULT now(),
                deleted_at timestamptz
            );
            CREATE UNIQUE INDEX users_email_unique ON users (email);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "users"
        `);
  }
}
