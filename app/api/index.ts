import { NextResponse, NextRequest } from 'next/server';

export const config = {
  runtime: 'edge', //This specifies the runtime environment that the middleware function will be executed in.
};

export default (request: NextRequest) => {
  return NextResponse.json({
    name: `Hello, from ${request.url} I'm now an Edge Function!`,
  });
};