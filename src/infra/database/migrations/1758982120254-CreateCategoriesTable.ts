import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategoriesTable1758982120254 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                CREATE TABLE categories (
                    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                    tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
                    name text NOT NULL,
                    description text,
                    order_int int DEFAULT 0,
                    created_at timestamptz DEFAULT now(),
                    updated_at timestamptz DEFAULT now(),
                    deleted_at timestamptz,
                    UNIQUE (tenant_id, name)
                );
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "categories"
        `);
  }
}
