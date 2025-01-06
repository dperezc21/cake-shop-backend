import OrganizationModel from "../models/organization.model";
import UserModel from "../models/user.model";

export class RecordExistsService {
    async organizationExistsByName(organizationName: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            OrganizationModel.findOne({ where: { name: organizationName }, attributes: ['id']})
                .then(value => resolve(!!value?.dataValues?.id)).catch(reject);
        });
    }

    async userExistsByEmail(email: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ where: { email }, attributes: ['id'] })
                .then(value => resolve(!!value?.dataValues?.id))
                .catch(reject);
        });
    }

    async organizationExistsById(organizationId: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            OrganizationModel.findByPk(organizationId, { attributes: ['id'] })
                .then(value => resolve(!!value?.dataValues?.id))
                .catch(reject);
        });
    }
}