import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCalendarsTable1758982505991 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                CREATE TABLE calendars (
                    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                    tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
                    name text NOT NULL,
                    description text,
                    location_id uuid REFERENCES locations(id),
                    is_public boolean DEFAULT true,   -- se verdadeiro, qualquer customer pode agendar sem invite
                    capacity int DEFAULT 1,           -- quantas pessoas por slot (1 = exclusivo)
                    created_at timestamptz DEFAULT now(),
                    updated_at timestamptz DEFAULT now(),
                    deleted_at timestamptz,
                    UNIQUE (tenant_id, name)
                );
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "calendars"
        `);
  }
}
