export const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'URL Shortener API',
      version: '1.0.0',
      description: 'An API for shortening URLs and tracking stats',
    },
    servers: [
      {
        url: 'http://localhost:4000/api/v1',
      },
    ],
    paths: {
      '/shorten': {
        post: {
          summary: 'Shorten a URL',
          description: 'This endpoint accepts a URL and returns a shortened version.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    originalUrl: {
                      type: 'string',
                      format: 'uri',
                      description: 'The original URL to shorten',
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: 'URL successfully shortened',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      shortUrl: {
                        type: 'string',
                        description: 'The shortened URL',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Invalid URL format',
            },
          },
        },
      },
      '/{shortId}': {
        get: {
          summary: 'Redirect to the original URL',
          description: 'This endpoint redirects the user to the original URL based on the shortened URL ID.',
          parameters: [
            {
              name: 'shortId',
              in: 'path',
              required: true,
              description: 'The short URL identifier',
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            302: {
              description: 'Redirect to the original URL',
            },
            404: {
              description: 'Short URL not found',
            },
          },
        },
      },
      '/stats/{shortId}': {
        get: {
          summary: 'Get stats for a shortened URL',
          description: 'Fetch stats (clicks and last accessed) for the provided short URL ID.',
          parameters: [
            {
              name: 'shortId',
              in: 'path',
              required: true,
              description: 'The short URL identifier',
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            200: {
              description: 'Statistics retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      clicks: {
                        type: 'integer',
                        description: 'The number of times the shortened URL was clicked',
                      },
                      lastAccessed: {
                        type: 'string',
                        format: 'date-time',
                        description: 'The last time the shortened URL was accessed',
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: 'Short URL not found',
            },
          },
        },
      },
    },
  };
  