import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomersTable1758981941225 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                CREATE TABLE customers (
                    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                    tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
                    external_id text,
                    name text NOT NULL,
                    phone text NOT NULL,
                    metadata jsonb,
                    created_at timestamptz DEFAULT now(),
                    updated_at timestamptz DEFAULT now(),
                    deleted_at timestamptz,
                    UNIQUE (tenant_id, phone)
                );
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "customers"
        `);
  }
}
