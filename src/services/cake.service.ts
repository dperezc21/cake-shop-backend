import CakeModel from "../models/cake.model";
import CakeImageModel from "../models/cake-image.model";
import {Model, Op} from "sequelize";

export class CakeService {
    private readonly includeModel = { model: CakeImageModel };
    async getCakesOfOrganization(organizationId: string): Promise<Model[]> {
        return new Promise((resolve, reject) => {
            CakeModel.findAll({
                where: { company_id: organizationId },
                include: this.includeModel
            }).then(resolve).catch(reason => reject("error while find company cakes"));
        });
    }

    async filterCakes(organizationId: number, name: string): Promise<Model[]> {
        return new Promise((resolve, reject) => {
           CakeModel.findAll({
               where: {
                   company_id: organizationId,
                   name: { [Op.like]: `%${name}%` }
               },
               include: this.includeModel
           }).then(resolve)
        });
    }
}