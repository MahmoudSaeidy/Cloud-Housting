import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma"

/**
 * @method GET
 * @route ~/api/articles/count
 * @desc  Get Articles Count
 * @access public
 */

export async function GET(request:NextRequest) {
    try {
        const count = await prisma.article.count();
        return NextResponse.json({count} , {status:200})

    }
catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "unknown error" },
      { status: 500 }
    );
}
}