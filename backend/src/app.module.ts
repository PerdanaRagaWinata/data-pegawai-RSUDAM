import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PegawaiModule } from './pegawai/pegawai.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',      // ganti sesuai MySQL kamu
      password: '',          // ganti kalau ada password
      database: 'db_pegawai',
      autoLoadEntities: true,
      synchronize: false,    // ⚠️ jangan true di database existing
    }),
    PegawaiModule,
  ],
})
export class AppModule {}