import type { INodeProperties } from 'n8n-workflow';

const showOnlyForScreenshotCapture = {
	operation: ['capture'],
	resource: ['screenshot'],
};

export const screenshotCaptureDescription: INodeProperties[] = [
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'https://example.com',
		description:
			'The complete URL of the website to capture. It must include the protocol (http:// or https://).',
		displayOptions: { show: showOnlyForScreenshotCapture },
		routing: {
			send: {
				type: 'query',
				property: 'url',
			},
		},
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: { show: showOnlyForScreenshotCapture },
		options: [
			{
				displayName: 'Accept Language',
				name: 'acceptLanguage',
				type: 'string',
				default: '',
				description:
					'Sets the Accept-Language header on requests to the target URL, allowing you to capture a website in a specific language',
				routing: { send: { type: 'query', property: 'accept_language' } },
			},
			{
				displayName: 'Cookies',
				name: 'cookies',
				type: 'string',
				default: '',
				placeholder: 'cookie1=value1;cookie2=value2',
				description:
					'A semicolon separated list of name=value cookie pairs to use when capturing the screenshot',
				routing: { send: { type: 'query', property: 'cookies' } },
			},
			{
				displayName: 'Crop',
				name: 'crop',
				type: 'string',
				default: '',
				placeholder: '10,20,50,100',
				description:
					'Capture an area of the page defined as left,top,width,height (in pixels)',
				routing: { send: { type: 'query', property: 'crop' } },
			},
			{
				displayName: 'CSS',
				name: 'css',
				type: 'string',
				default: '',
				description: 'A CSS string to inject in the web page before capturing the screenshot',
				routing: { send: { type: 'query', property: 'css' } },
			},
			{
				displayName: 'Delay',
				name: 'delay',
				type: 'number',
				typeOptions: { minValue: 0, maxValue: 10 },
				default: 0,
				description:
					'The delay, in seconds (0 to 10), to wait after the page is loaded before capturing the screenshot',
				routing: { send: { type: 'query', property: 'delay' } },
			},
			{
				displayName: 'Element',
				name: 'element',
				type: 'string',
				default: '',
				placeholder: '#header',
				description:
					'Capture a screenshot of the first element matched by the given CSS selector',
				routing: { send: { type: 'query', property: 'element' } },
			},
			{
				displayName: 'Element Overlap',
				name: 'elementOverlap',
				type: 'boolean',
				default: false,
				description:
					'Whether to also capture the elements that overlap the element targeted by the Element option',
				routing: { send: { type: 'query', property: 'element_overlap' } },
			},
			{
				displayName: 'Extract HTML',
				name: 'extractHtml',
				type: 'boolean',
				default: false,
				description:
					'Whether to extract the HTML of the page at the same time the screenshot is made. An extracted_html attribute is added to the returned JSON document.',
				routing: { send: { type: 'query', property: 'extract_html' } },
			},
			{
				displayName: 'Extract Text',
				name: 'extractText',
				type: 'boolean',
				default: false,
				description:
					'Whether to extract the text of the page at the same time the screenshot is made. An extracted_text attribute is added to the returned JSON document.',
				routing: { send: { type: 'query', property: 'extract_text' } },
			},
			{
				displayName: 'Format',
				name: 'format',
				type: 'options',
				options: [
					{ name: 'JPEG', value: 'jpeg' },
					{ name: 'PNG', value: 'png' },
					{ name: 'WebP', value: 'webp' },
				],
				default: 'jpeg',
				description: 'The image format of the captured screenshot',
				routing: { send: { type: 'query', property: 'format' } },
			},
			{
				displayName: 'Fresh',
				name: 'fresh',
				type: 'boolean',
				default: false,
				description:
					'Whether to force the API to capture a fresh new screenshot instead of returning a screenshot from the cache',
				routing: { send: { type: 'query', property: 'fresh' } },
			},
			{
				displayName: 'Full Page',
				name: 'fullPage',
				type: 'boolean',
				default: false,
				description: 'Whether to capture the entire page of the target website',
				routing: { send: { type: 'query', property: 'full_page' } },
			},
			{
				displayName: 'Headers',
				name: 'headers',
				type: 'string',
				default: '',
				placeholder: 'Header1=value1;Header2=value2',
				description:
					'A semicolon separated list of key=value header pairs to use when capturing the screenshot',
				routing: { send: { type: 'query', property: 'headers' } },
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				typeOptions: { minValue: 0, maxValue: 4320 },
				default: 1080,
				description:
					'The height, in pixels, of the viewport to use. This is ignored if Full Page is enabled.',
				routing: { send: { type: 'query', property: 'height' } },
			},
			{
				displayName: 'JavaScript',
				name: 'js',
				type: 'string',
				default: '',
				description:
					'Additional JavaScript code to be injected into the page before capturing',
				routing: { send: { type: 'query', property: 'js' } },
			},
			{
				displayName: 'No Ads',
				name: 'noAds',
				type: 'boolean',
				default: false,
				description: 'Whether to hide ads on the captured page',
				routing: { send: { type: 'query', property: 'no_ads' } },
			},
			{
				displayName: 'No Cookie Banners',
				name: 'noCookieBanners',
				type: 'boolean',
				default: false,
				description: 'Whether to hide cookie consent banners on the captured page',
				routing: { send: { type: 'query', property: 'no_cookie_banners' } },
			},
			{
				displayName: 'No Tracking',
				name: 'noTracking',
				type: 'boolean',
				default: false,
				description: 'Whether to block tracking scripts on the captured page',
				routing: { send: { type: 'query', property: 'no_tracking' } },
			},
			{
				displayName: 'Quality',
				name: 'quality',
				type: 'number',
				typeOptions: { minValue: 0, maxValue: 100 },
				default: 80,
				description:
					'The quality of the image between 0 and 100. This works with the JPEG and WebP formats.',
				routing: { send: { type: 'query', property: 'quality' } },
			},
			{
				displayName: 'Scale Factor',
				name: 'scaleFactor',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 2 },
				default: 1,
				description:
					'The device scale factor to use: 1 (standard resolution) or 2 (high definition for retina displays)',
				routing: { send: { type: 'query', property: 'scale_factor' } },
			},
			{
				displayName: 'Scroll Page',
				name: 'scrollPage',
				type: 'boolean',
				default: false,
				description:
					'Whether to scroll through the entire page before capturing a screenshot. This is useful to trigger animations or lazy loaded elements.',
				routing: { send: { type: 'query', property: 'scroll_page' } },
			},
			{
				displayName: 'Thumbnail Width',
				name: 'thumbnailWidth',
				type: 'number',
				typeOptions: { minValue: 0, maxValue: 1920 },
				default: 0,
				description:
					'The width, in pixels, of the thumbnail to generate. The aspect ratio is preserved. This is ignored if Full Page is enabled.',
				routing: { send: { type: 'query', property: 'thumbnail_width' } },
			},
			{
				displayName: 'Time to Live',
				name: 'ttl',
				type: 'number',
				typeOptions: { minValue: 0, maxValue: 2592000 },
				default: 86400,
				description:
					'Number of seconds the screenshot is cached (0 to 2592000). API calls with the same parameters return a cached screenshot and do not count in your monthly quota.',
				routing: { send: { type: 'query', property: 'ttl' } },
			},
			{
				displayName: 'Transparent Background',
				name: 'transparent',
				type: 'boolean',
				default: false,
				description:
					'Whether to capture a screenshot with transparency enabled. This only works with the PNG format.',
				routing: { send: { type: 'query', property: 'transparent' } },
			},
			{
				displayName: 'User Agent',
				name: 'userAgent',
				type: 'string',
				default: '',
				description:
					'Sets the User-Agent header to emulate a particular device when making screenshots',
				routing: { send: { type: 'query', property: 'user_agent' } },
			},
			{
				displayName: 'Wait For',
				name: 'waitFor',
				type: 'string',
				default: '',
				placeholder: '#content',
				description:
					'Wait until the provided CSS selector matches an element present in the page before capturing a screenshot',
				routing: { send: { type: 'query', property: 'wait_for' } },
			},
			{
				displayName: 'Wait Until',
				name: 'waitUntil',
				type: 'options',
				options: [
					{
						name: 'DOM Loaded',
						value: 'dom_loaded',
						description: 'Wait until the initial HTML document has been completely loaded',
					},
					{
						name: 'Page Loaded',
						value: 'page_loaded',
						description:
							'Wait until the whole page has loaded, including all dependent resources',
					},
					{
						name: 'Network Idle',
						value: 'network_idle',
						description:
							'Wait until the whole page has loaded and the network is idle',
					},
				],
				default: 'network_idle',
				description:
					'Wait until the given criterion is satisfied to consider that the page has finished loading',
				routing: { send: { type: 'query', property: 'wait_until' } },
			},
			{
				displayName: 'Wait Until Timeout',
				name: 'waitUntilTimeout',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 30 },
				default: 30,
				description:
					'The maximum time, in seconds (1 to 30), to wait for the Wait Until criterion to be satisfied',
				routing: { send: { type: 'query', property: 'wait_until_timeout' } },
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				typeOptions: { minValue: 0, maxValue: 7680 },
				default: 1920,
				description: 'The width, in pixels, of the viewport to use',
				routing: { send: { type: 'query', property: 'width' } },
			},
		],
	},
];
