import type { INodeProperties } from 'n8n-workflow';
import { screenshotCaptureDescription } from './capture';

const showOnlyForScreenshots = {
	resource: ['screenshot'],
};

export const screenshotDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForScreenshots,
		},
		options: [
			{
				name: 'Capture',
				value: 'capture',
				action: 'Capture a screenshot',
				description: 'Capture a screenshot of a website',
				routing: {
					request: {
						method: 'GET',
						url: '/urltoimage',
						qs: {
							response_type: 'json',
						},
					},
				},
			},
		],
		default: 'capture',
	},
	...screenshotCaptureDescription,
];
