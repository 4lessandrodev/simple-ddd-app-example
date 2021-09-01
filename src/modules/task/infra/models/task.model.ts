export class TaskModel {
	id!: string;
	description!: string;
	ownerId!: string;
	isDone!: boolean;
	createdAt!: Date;
	updatedAt!: Date;
}

export default TaskModel;
