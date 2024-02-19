import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secret = 'awdadadwa';

export async function GET() {
  try {
    const payload = { user_id: 1, role: 'ADMIN' };
    const access = jwt.sign(payload, secret as string, { expiresIn: 60 * 15 });
    const refresh = jwt.sign(payload, secret as string, {
      expiresIn: 60 * 60 * 24 * 7,
    });
    return NextResponse.json({
      access,
      refresh,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ detail: 'Ошибка при работе с токеном' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      }
    );
  }
}
