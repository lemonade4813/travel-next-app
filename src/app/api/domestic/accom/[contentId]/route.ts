import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request : NextRequest, { params } : { params : { contentId : string }}) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/domestic/accom/detail/${params.contentId}`, {
        headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
    });

    if (!res.ok) {
        if(res.status === 401 || res.status === 403 ){
            return NextResponse.redirect('/login');
        }
        else
        {
            return NextResponse.json({ error: "에러가 발생했습니다." }, { status: res.status });
        }
    }

    const { data }  = await res.json();

    return NextResponse.json({ data });
}