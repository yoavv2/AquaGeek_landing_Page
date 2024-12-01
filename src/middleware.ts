import { defineMiddleware } from 'astro:middleware';

// Define debug info type
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

export const onRequest = defineMiddleware(async (context, next) => {
    // Collect debug information
    const debugInfo: DebugInfo = {
        timestamp: new Date().toISOString(),
        rawUrl: context.request.url,
        headers: Object.fromEntries(context.request.headers),
        userAgent: context.request.headers.get('user-agent'),
        referrer: context.request.headers.get('referer')
    };

    try {
        const url = new URL(context.request.url);
        debugInfo.parsedUrl = {
            full: url.toString(),
            origin: url.origin,
            pathname: url.pathname,
            search: url.search,
            params: Object.fromEntries(url.searchParams)
        };

        console.log('Middleware Debug Info:', JSON.stringify(debugInfo, null, 2));

        // If URL has fbclid, remove it and redirect
        if (url.searchParams.has('fbclid')) {
            url.searchParams.delete('fbclid');
            const redirectUrl = url.toString();
            debugInfo.redirectTo = redirectUrl;
            console.log('Redirecting to:', redirectUrl);
            return context.redirect(redirectUrl);
        }

    } catch (error) {
        console.error('Error in middleware:', error);
        // Add error info to the request for debugging
        context.locals.middlewareError = error instanceof Error ? error.message : String(error);
    }

    // Add debug info to the request context for use in components
    context.locals.debugInfo = debugInfo;

    // Continue to the requested page
    return next();
});
