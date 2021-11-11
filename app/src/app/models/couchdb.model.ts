export class CouchDBRowModel<T> {
	id: string;
	key: string;
	value: any;
	doc: T;
}

export class CouchDBModel<T> {
	total_rows: number;
	offset: number;
	rows: CouchDBRowModel<T>[];
}