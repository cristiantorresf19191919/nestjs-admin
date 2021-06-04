import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Role } from './models/role.entity';

@Injectable()
export class RoleService extends AbstractService {
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>
    ){
        super(roleRepository)
    }

    async updateRol(id:number, data):Promise<any>{
    console.log("🚀 ~ file: role.service.ts ~ line 25 ~ RoleService ~ update ~ data", data)
    console.log("🚀 ~ file: role.service.ts ~ line 25 ~ RoleService ~ update ~ id", id)
        const role = await this.roleRepository.findOne({id});
        if (!role) throw new BadRequestException('Rol not found')
        role.permissions = data.permissions;
       await this.roleRepository.save(role);
       return await this.findOne({id});
    }

    


 


}
