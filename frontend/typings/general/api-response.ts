export type APIResponse<Data = void> =
	| {
			success: true;
			message?: string;
			data: string[];
			code: number;
			results: number
	  }
	| {
			success: false;
			error: string;
			type?: string;
			code: number;
			data?: unknown;
			results: number;
	  };

export type APIFailureResponse = Extract<APIResponse, { success: false }>;

export type AsyncAPIResponse<Data = void> = Promise<APIResponse<Data>>;
