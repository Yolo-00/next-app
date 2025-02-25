import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

// export default createMiddleware(routing);

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
    // 执行 next-intl 的中间件
    return intlMiddleware(request);
}

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(zh|en)/:path*']
};