# n8n-nodes-apiflash

This is an n8n community node for [ApiFlash](https://apiflash.com), a screenshot API built on top of headless Chrome. It lets you capture screenshots of any website from your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation. The package name is `n8n-nodes-apiflash`.

## Operations

### Screenshot

- **Capture**: Capture a screenshot of a website.

Use the **Output** option to choose what the node returns:

- **Screenshot Metadata** (default): a JSON object containing the URL of the captured screenshot:

```json
{
	"url": "https://api.apiflash.com/v1/urltoimage/cache/....jpeg"
}
```

  You can pass this URL to any downstream node (HTTP Request, Airtable, Slack, email, ...) to download or share the image.

- **Image File**: the screenshot itself as binary file data, placed in the field configured by **Put Output File in Field** (default `data`). This lets you use the screenshot directly in downstream nodes without an extra download step.

Supported options include image format (JPEG, PNG, WebP), viewport size, full page capture, element capture, crop, quality, delay, wait conditions, CSS/JS injection, ad/cookie-banner/tracker blocking, custom headers and cookies, caching TTL, and HTML/text extraction. See the [ApiFlash documentation](https://apiflash.com/documentation) for details on each parameter.

## Credentials

You need an ApiFlash access key to use this node:

1. Sign up at [apiflash.com](https://apiflash.com). The free plan includes 100 screenshots per month.
2. Copy your access key from the [dashboard](https://apiflash.com/dashboard/access_keys).
3. In n8n, create new **ApiFlash API** credentials and paste your access key.

## Compatibility

Requires n8n version 1.0 or later.

## Resources

- [ApiFlash documentation](https://apiflash.com/documentation)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE.md)
