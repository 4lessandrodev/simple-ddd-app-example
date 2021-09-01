import { ValueObject, Result } from 'types-ddd';

interface TaskDescriptionProp {
	value: string
};

export class TaskDescriptionValueObject extends ValueObject<TaskDescriptionProp>{
	private constructor (props: TaskDescriptionProp){
		super(props);
	}

	get value (): string {
		return this.props.value.toLowerCase();
	}

	public static isValidValue (value:string): boolean {
		return value.length >= 3 && value.length <= 140;
	}

	public static create (value: string): Result<TaskDescriptionValueObject>{
		
		const isValidValue = TaskDescriptionValueObject.isValidValue(value);

		if(!isValidValue) {
			return Result.fail(
				'Invalid TaskDescription. Must has Min 3 and Max 140 chars', 
				'UNPROCESSABLE_ENTITY'
			);
		}

		return Result.ok(new TaskDescriptionValueObject({ value }));
	}
}

export default TaskDescriptionValueObject;
