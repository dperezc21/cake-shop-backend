import {Model} from "sequelize";
import OrganizationModel from "../models/organization.model";
import {OrganizationInterface} from "../interfaces/organization.interface";

export class OrganizationService {
    organizationByEmail(organizationEmail: string): Promise<Model> {
        return new Promise((resolve, reject) => {
            OrganizationModel.findOne({ where: { email: organizationEmail } })
                .then(resolve).catch(reject);
        });
    }

    async saveOrganization(param: OrganizationInterface): Promise<Model> {
        return new Promise((resolve, reject) => {
            OrganizationModel.create(
                { name: param.organizationName, phone: param.phone, email: param.email, description: param.description, logo: param.image })
                .then(resolve).catch(reject);
        })
    }

    async organizationByName(organizationName: string): Promise<Model> {
        return new Promise((resolve, reject) => {
            OrganizationModel.findOne({ where: { name: organizationName } })
                .then(resolve).catch(reject);
        })
    }

    async updateOrganization(organizationId: string, {organizationName: name, phone, email, description, image: logo}: Omit<OrganizationInterface, "id">): Promise<boolean> {
       return new Promise((resolve, reject) => {
           let organization = {};
           if(logo) organization = { name, phone, email, description, logo };
           else organization = { name, phone, email, description };
           OrganizationModel.update(organization, { where: {id: organizationId} })
               .then(value => resolve(value[0] == 1)).catch(reject)
       });
    }
}