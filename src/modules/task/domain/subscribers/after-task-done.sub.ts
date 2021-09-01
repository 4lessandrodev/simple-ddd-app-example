import { IHandle, DomainEvents, Logger } from 'types-ddd';
import TaskDoneEvent from '@modules/task/domain/events/task-done.event';

export class AfterTaskDoneSubscriber implements IHandle<TaskDoneEvent> {

	constructor (){
		this.setupSubscriptions();
	}

	setupSubscriptions (): void {
		DomainEvents.register(
			(event) => this.dispatch(
				Object.assign(event)
			),  TaskDoneEvent.name);
	}

	async dispatch (event: TaskDoneEvent): Promise<void> {
		const { task } = event;
		// The logic to be executed on mark a task as done goes here
		Logger.info(`[Event]: The task ${task.description.value} was marked as done`);
	}

}

export default AfterTaskDoneSubscriber;
