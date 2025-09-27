import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1758766186525 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE tenants (
                id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                name text NOT NULL,
                slug text NOT NULL,
                metadata jsonb,
                is_active boolean DEFAULT true,
                created_at timestamptz DEFAULT now(),
                updated_at timestamptz DEFAULT now(),
                deleted_at timestamptz
            );
        `);

    await queryRunner.query(`
            CREATE UNIQUE INDEX idx_tenants_slug ON tenants (slug);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "tenants"
        `);
  }
}
