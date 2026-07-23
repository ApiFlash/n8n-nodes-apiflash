import type {
    IDataObject,
    IExecuteSingleFunctions,
    IN8nHttpFullResponse,
    INodeExecutionData,
    INodeProperties,
} from 'n8n-workflow';
import { jsonParse } from 'n8n-workflow';
import { screenshotCaptureDescription } from './capture';

const showOnlyForScreenshots = {
    resource: ['screenshot'],
};

async function captureOutput(
    this: IExecuteSingleFunctions,
    items: INodeExecutionData[],
    responseData: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
    const output = this.getNodeParameter('output', 'json') as string;
    const body = responseData.body as Buffer;

    if (output === 'image') {
        const binaryPropertyName = this.getNodeParameter('binaryPropertyName', 'data') as string;
        const format = this.getNodeParameter('additionalOptions.format', 'jpeg') as string;
        const extension = format === 'jpeg' ? 'jpg' : format;
        const contentType = responseData.headers['content-type'] as string | undefined;
        const binaryData = await this.helpers.prepareBinaryData(
            body,
            `screenshot.${extension}`,
            contentType,
        );

        return items.map((item) => {
            item.json = {};
            item.binary = { [binaryPropertyName]: binaryData };
            return item;
        });
    }

    const parsed = jsonParse<IDataObject>(body.toString());
    return items.map((item) => {
        item.json = parsed;
        return item;
    });
}

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
                        encoding: 'arraybuffer',
                        returnFullResponse: true,
                    },
                    output: {
                        postReceive: [captureOutput],
                    },
                },
            },
        ],
        default: 'capture',
    },
    ...screenshotCaptureDescription,
];
