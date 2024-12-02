import {createOrganizationTable} from "../models/organization.model";
import {createUserTable} from "../models/user.model";
import {createCakeImageTable} from "../models/cake-image.model";
import {createCakeTable} from "../models/cake.model";
import {CreateTablesError} from "../utils/exceptions/create-tables-error";

export class CreateTablesDb {

    async creatingTablesDB() {
        try {
            await createOrganizationTable();
            await createUserTable();
            await createCakeTable();
            await createCakeImageTable();
        } catch (err) {
            throw new CreateTablesError("Error while create tables in data base");
        }
    }

}