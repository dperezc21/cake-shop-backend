import {createOrganizationTable} from "../models/organization.model";
import {createUserTable} from "../models/user.model";
import {createCakeImageTable} from "../models/cake-image.model";
import {addColumnReferenceToCakeCategory, createCakeTable} from "../models/cake.model";
import {CreateTablesError} from "../utils/exceptions/create-tables-error";
import {createUserRolTable} from "../models/user-rol.model";
import {CakeCategoryModel} from "../models/cake-category.model";

const createCategoryModel = new CakeCategoryModel();

export class CreateTablesDb {

    async creatingTablesDB() {
        try {
            await createOrganizationTable();
            await createUserRolTable();
            await createUserTable();
            await createCakeTable();
            await createCakeImageTable();
            await createCategoryModel.createCakeCategoryTable();
            await addColumnReferenceToCakeCategory();
        } catch (err) {
            throw new CreateTablesError(err);
        }
    }

}