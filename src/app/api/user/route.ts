import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secret = 'awdadadwa';

type TTokenPayload = {
  user_id: number;
  role: string;
};

export function GET(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return new NextResponse(
        JSON.stringify({ detail: 'Токен доступа отсутствует' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
        }
      );
    }
    const decoded = jwt.verify(token, secret);
    if (!decoded) {
      return new NextResponse(
        JSON.stringify({ detail: 'В доступе отказано' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
        }
      );
    }
    return NextResponse.json({
      id: (decoded as TTokenPayload).user_id,
      login: 'Никита Малашевич',
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ detail: 'Error reading or parsing the JSON file!' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      }
    );
  }
}
