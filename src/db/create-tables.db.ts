import {createOrganizationTable} from "../models/organization.model";
import {createUserTable} from "../models/user.model";
import {createCakeImageTable} from "../models/cake-image.model";
import {createCakeTable} from "../models/cake.model";
import {CreateTablesError} from "../utils/exceptions/create-tables-error";
import {createUserRolTable} from "../models/user-rol.model";
import {CategoryCakeModel} from "../models/category-cake.model";

const createCategoryModel = new CategoryCakeModel();

export class CreateTablesDb {

    async creatingTablesDB() {
        try {
            await createOrganizationTable();
            await createUserRolTable();
            await createUserTable();
            await createCakeTable();
            await createCakeImageTable();
            //await createCategoryModel.createCategoryCakeTable();
        } catch (err) {
            throw new CreateTablesError(err);
        }
    }

}