import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'postgresql://mediumclone.dogvvnyctjypeevpslpt:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default config;
