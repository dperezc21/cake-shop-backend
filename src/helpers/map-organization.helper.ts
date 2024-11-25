import {OrganizationInterface} from "../interfaces/organization.interface";

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
}