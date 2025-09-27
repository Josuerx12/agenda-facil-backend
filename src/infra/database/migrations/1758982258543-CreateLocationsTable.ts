import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLocationsTable1758982258543 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                CREATE TABLE locations (
                    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                    tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
                    name text NOT NULL,
                    address text,
                    timezone text DEFAULT 'America/Sao_Paulo',
                    metadata jsonb,
                    created_at timestamptz DEFAULT now(),
                    updated_at timestamptz DEFAULT now(),
                    deleted_at timestamptz,
                    UNIQUE (tenant_id, name)
                );
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "locations"
        `);
  }
}
