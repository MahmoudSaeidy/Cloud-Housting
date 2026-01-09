import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ARTICLE_PER_PAGE } from '@/src/utils/constants'
import { verifyToken } from '@/src/utils/verifyToken'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pageNumber = searchParams.get('pageNumber') || '1'

    const page = Number(pageNumber)
    const skip = (page - 1) * ARTICLE_PER_PAGE

    const articles = await prisma.article.findMany({
      skip,
      take: ARTICLE_PER_PAGE,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(articles, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

/*
* @method POST
* @route ~/api/articles
*/
export async function POST(request: NextRequest) {
  try {
    const user = await verifyToken(request)

    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: 'only admin, access denied' },
        { status: 401 }
      )
    }

    const body = await request.json()

    const { title, description } = body

    // validation بسيط (مثل التعليقات)
    if (!title || title.trim() === '') {
      return NextResponse.json(
        { message: 'Title is required' },
        { status: 400 }
      )
    }

    if (!description || description.trim() === '') {
      return NextResponse.json(
        { message: 'Description is required' },
        { status: 400 }
      )
    }

    const newArticle = await prisma.article.create({
      data: {
        title: title.trim(),
        description: description.trim(),
      },
    })

    return NextResponse.json(newArticle, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
