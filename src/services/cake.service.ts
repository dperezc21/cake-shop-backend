import CakeModel from "../models/cake.model";
import CakeImageModel from "../models/cake-image.model";
import {Model} from "sequelize";


export class CakeService {
    async getCakesOfOrganization(organizationId: string): Promise<Model[]> {
        return new Promise((resolve, reject) => {
            CakeModel.findAll({
                where: { company_id: organizationId },
                include: { model: CakeImageModel }
            }).then(resolve).catch(reason => reject("error while find company cakes"));
        });
    }
}