/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type DebugInfo = {
    timestamp: string;
    rawUrl: string;
    headers: { [key: string]: string };
    userAgent: string | null;
    referrer: string | null;
    parsedUrl?: {
        full: string;
        origin: string;
        pathname: string;
        search: string;
        params: { [key: string]: string };
    };
    redirectTo?: string;
};

declare namespace App {
    interface Locals {
        debugInfo?: DebugInfo;
        middlewareError?: string;
    }
}