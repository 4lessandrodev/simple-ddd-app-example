import { UserModel } from '@modules/user/infra/models/user.model';

export interface IDatabase {
	users: UserModel[]
}

export class Database implements IDatabase {
	public users: UserModel[];
	constructor (){
		this.users = [];
	}

};

export default Database;
