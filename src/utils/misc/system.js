export const isServer = process.server;
export const isBrowser = !isServer;

export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isStaging = process.env.NODE_ENV === 'staging';
export const isTest = process.env.NODE_ENV === 'test';

export const isSpa = process.isSpa;

// variables
export const apiHost = process.apiHost;
