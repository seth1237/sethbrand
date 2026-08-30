import { NextRequest, NextResponse } from 'next/server';
import { handleContact } from '@/server/contact';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  return handleContact(req);
}