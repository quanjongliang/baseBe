import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env["POSTGRES_HOST"] || "localhost",
      port: parseInt(process.env["POSTGRES_PORT"] || "5432", 10),
      username: process.env["POSTGRES_USER"] || "postgres",
      password: process.env["POSTGRES_PASSWORD"] || "postgres",
      database: process.env["POSTGRES_DB"] || "baseDb",
      // host:
      //   process.env["POSTGRES_HOST"] ||
      //   "ec2-54-165-184-219.compute-1.amazonaws.com",
      // port: parseInt(process.env["POSTGRES_PORT"] || "5432", 10),
      // username: process.env["POSTGRES_USER"] || "gokvvzqjxokqat",
      // password:
      //   process.env["POSTGRES_PASSWORD"] ||
      //   "de1d86527e41e11ed786a5caf0d28276f56e645e720b80c1070f3489b6919ed0",
      // database: process.env["POSTGRES_DB"] || "d3j28h2fcilrgt",
      // url:
      // process.env.DATABASE_URL || "postgres://user:password@postgres:5432/db",
      // ssl: { rejectUnauthorized: false },
      synchronize: !!JSON.parse(process.env["TYPEORM_SYNCHRONIZE"] || "true"),
      entities: [__dirname + "/dist/**/*.entity.js"],
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {}
