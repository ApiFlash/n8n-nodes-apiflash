import type {
    IDataObject,
    IExecuteSingleFunctions,
    IN8nHttpFullResponse,
    INodeExecutionData,
    INodeProperties,
    JsonObject,
} from 'n8n-workflow';
import { jsonParse, NodeApiError } from 'n8n-workflow';
import { screenshotCaptureDescription } from './capture';

const showOnlyForScreenshots = {
    resource: ['screenshot'],
};

// ApiFlash reports failures as a JSON object with an `error_message`, a JSON map of
// field names to validation messages, or a plain text body, depending on the failure.
function extractErrorMessage(text: string, statusCode: number): string {
    const data = jsonParse<IDataObject | null>(text, { fallbackValue: null });
    if (data && typeof data === 'object') {
        if (typeof data.error_message === 'string') {
            return data.error_message;
        }
        const fieldErrors = Object.entries(data)
            .filter(([, messages]) => Array.isArray(messages))
            .map(([field, messages]) => `${field}: ${(messages as string[]).join(' ')}`);
        if (fieldErrors.length) {
            return fieldErrors.join(' ');
        }
    }
    return text.trim() || `ApiFlash returned a ${statusCode} response`;
}

function throwApiError(this: IExecuteSingleFunctions, responseData: IN8nHttpFullResponse): never {
    const statusCode = responseData.statusCode;
    const text = Buffer.from(responseData.body as Buffer).toString();
    let message = extractErrorMessage(text, statusCode);
    if (statusCode === 401) {
        // The API says "No access key was provided" for invalid keys too, which is misleading here.
        message =
            'Your ApiFlash access key was rejected. Check the credential uses a key from https://apiflash.com/dashboard/access_keys';
    } else if (statusCode === 402) {
        message =
            'Your ApiFlash quota is used up for the current period. Upgrade your plan at https://apiflash.com/dashboard/subscription';
    }
    throw new NodeApiError(this.getNode(), { statusCode, body: text } as JsonObject, {
        message,
        httpCode: String(statusCode),
    });
}

async function captureOutput(
    this: IExecuteSingleFunctions,
    items: INodeExecutionData[],
    responseData: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
    if (responseData.statusCode >= 400) {
        throwApiError.call(this, responseData);
    }

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
                        ignoreHttpStatusErrors: true,
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
