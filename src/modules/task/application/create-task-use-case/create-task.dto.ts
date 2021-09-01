export interface CreateTaskDto {
	ownerId: string;
	description: string;
	isDone: boolean;
}

export default CreateTaskDto;
