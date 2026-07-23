import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class ApiflashApi implements ICredentialType {
	name = 'apiflashApi';

	displayName = 'ApiFlash API';

	icon: Icon = {
		light: 'file:../nodes/Apiflash/apiflash.svg',
		dark: 'file:../nodes/Apiflash/apiflash.dark.svg',
	};

	documentationUrl = 'https://github.com/ApiFlash/n8n-nodes-apiflash?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Access Key',
			name: 'accessKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description:
				'Your ApiFlash access key. You can find it in your <a href="https://apiflash.com/dashboard/access_keys">ApiFlash dashboard</a>.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				access_key: '={{$credentials.accessKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.apiflash.com/v1',
			url: '/urltoimage/quota',
		},
	};
}
