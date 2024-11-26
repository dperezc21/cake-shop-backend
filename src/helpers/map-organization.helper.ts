import {OrganizationInterface} from "../interfaces/organization.interface";
import {Model} from "sequelize";

export class MapOrganizationHelper {
    static mapOrganization(organizationModel: any): OrganizationInterface {
        return {
            id: organizationModel.id,
            name: organizationModel.name,
            email: organizationModel.email,
            phone: organizationModel.phone,
            image: organizationModel.logo
        }
    }

    static mapOrganizationList(organizations: Model[]) {
        return organizations.map(this.mapOrganization);
    }
}