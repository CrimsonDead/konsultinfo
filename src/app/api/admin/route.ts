import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { isUndefined } from 'lodash';
import type { ILoginAdmin } from '@/features/Authorization/types';

const secret = 'awdadadwa';

export async function POST(req: NextRequest) {
  try {
    const { email, password }: Omit<ILoginAdmin, ' onSuccess' | 'onFailed'> =
      await req.json();
    if (isUndefined(password) || isUndefined(email)) {
      return new NextResponse(
        JSON.stringify({ detail: 'Недостаточно информации для регистрации' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
        }
      );
    }
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
