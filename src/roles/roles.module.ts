import { Role, RoleSchema } from './schemas/Role.schema';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Role.name, schema: RoleSchema}])
  ],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService]
})
export class RolesModule {}
