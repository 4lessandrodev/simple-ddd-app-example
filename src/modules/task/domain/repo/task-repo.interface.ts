import { Filter } from 'types-ddd';

export interface ITaskRepository<Aggregate, Model> {
	save: (target: Aggregate) => Promise<void>
	findOneTask: (filter: Filter<Partial<Model>>) => Promise<Aggregate | null>
	getTasks: () => Promise<Model[]>
}

export default ITaskRepository;
