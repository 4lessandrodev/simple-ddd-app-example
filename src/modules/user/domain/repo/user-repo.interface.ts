import { Filter } from "types-ddd";

export interface IUserRepository<Aggregate, Model>{
	save: (target: Aggregate)=> Promise<void>
	findOneUser: (filter: Filter<Partial<Model>>) => Promise<Aggregate | null>
	exists: (filter: Filter<Partial<Model>>) => Promise<boolean>;
	getUsers: () => Promise<Model[]>;
}

export default IUserRepository;
