import {OrganizationInterface} from "../../interfaces/organization.interface";
import {Model} from "sequelize";

export class MapOrganizationUtil {
    static mapOrganization(organizationModel: any): OrganizationInterface {
        return {
            id: organizationModel?.id,
            organizationName: organizationModel?.name,
            email: organizationModel?.email,
            phone: organizationModel?.phone,
            image: organizationModel?.logo,
            description: organizationModel?.description
        }
    }

    static mapOrganizationList(organizations: Model[]) {
        return organizations.map(this.mapOrganization);
    }
}