import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCalendarAvailabilitiesTable1758990445370
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                CREATE TABLE calendar_availabilities (
                    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                    calendar_id uuid NOT NULL REFERENCES calendars(id) ON DELETE CASCADE,
                    tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
                    weekday int,            -- 0-6 (nullable se for date range)
                    start_time time,        -- hora local do timezone da location
                    end_time time,
                    start_date date,        -- para disponibilidade pontual (opcional)
                    end_date date,
                    recurrence jsonb,       -- RFC5545-lite or custom: {"freq":"WEEKLY","interval":1}
                    metadata jsonb,
                    created_at timestamptz DEFAULT now(),
                    updated_at timestamptz DEFAULT now(),
                    deleted_at timestamptz
                );
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "calendar_availabilities"
        `);
  }
}
