import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { screenshotDescription } from './resources/screenshot';

export class Apiflash implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ApiFlash',
		name: 'apiflash',
		icon: { light: 'file:apiflash.svg', dark: 'file:apiflash.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Capture website screenshots with the ApiFlash API',
		defaults: {
			name: 'ApiFlash',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'apiflashApi', required: true }],
		requestDefaults: {
			baseURL: 'https://api.apiflash.com/v1',
			headers: {
				Accept: 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Screenshot',
						value: 'screenshot',
					},
				],
				default: 'screenshot',
			},
			...screenshotDescription,
		],
	};
}
