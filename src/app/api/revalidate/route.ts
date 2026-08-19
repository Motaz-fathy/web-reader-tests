import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug') || 'isr-premier-league';
  const tag = searchParams.get('tag');

  try {
    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({
        revalidated: true,
        type: 'tag',
        target: tag,
        now: Date.now(),
        message: `تمت إعادة توليد الوسم ${tag} بنجاح`,
      });
    }

    // Revalidate specific path
    const path = `/articles/${slug}`;
    revalidatePath(path);
    revalidatePath('/');

    return NextResponse.json({
      revalidated: true,
      type: 'path',
      target: path,
      now: Date.now(),
      message: `تم تجديد كاش الصفحة ${path} في الخلفية بنجاح`,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        revalidated: false,
        message: err?.message || 'فشلت عملية إعادة التوليد',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
