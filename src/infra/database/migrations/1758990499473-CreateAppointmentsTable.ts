import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAppointmentsTable1758990499473
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE appointments (
                id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
                calendar_id uuid NOT NULL REFERENCES calendars(id) ON DELETE CASCADE,
                service_id uuid REFERENCES services(id),
                customer_id uuid REFERENCES customers(id),
                created_by uuid REFERENCES users(id), -- quem criou (staff) se aplicável
                start_at timestamptz NOT NULL,
                end_at timestamptz NOT NULL,
                status text NOT NULL DEFAULT 'pending', -- pending, confirmed, canceled, completed, no_show
                meta jsonb,
                attendees int DEFAULT 1,
                created_at timestamptz DEFAULT now(),
                updated_at timestamptz DEFAULT now(),
                canceled_at timestamptz,
                deleted_at timestamptz
            );
`);

    await queryRunner.query(
      `CREATE INDEX idx_appointments_tenant_calendar_time ON appointments (tenant_id, calendar_id, start_at, end_at);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "idx_appointments_tenant_calendar_time"
        `);

    await queryRunner.query(`
            DROP TABLE "appointments"
        `);
  }
}
