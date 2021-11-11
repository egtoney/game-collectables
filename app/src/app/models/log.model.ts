export interface LogCodeModel {
	file: string;
	line: number;
	column: number;
	function: string;
}

export interface LogHttpModel {
	client: string;
	port: number;
}

export class LogModel {
	_id: string;
	time: Date;
	category: string;
	data: any;
	level: string;
	code: LogCodeModel;
	http: LogHttpModel;

	constructor(init: Partial<LogModel>) {
		Object.assign(this, init);
	}
}
