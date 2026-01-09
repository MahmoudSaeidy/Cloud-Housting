import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifyTokenForPage } from "@/src/utils/verifyToken"
import { ARTICLE_PER_PAGE } from "@/src/utils/constants"
import { Article } from "@prisma/client"
import Link from "next/link"
import { getArticles, getCount } from "@/src/ApiCalls/articlesAPICalls"
import Pagination from "@/src/components/articles/Pagination"
import DeleteArticleButton from "./DeleteArticleButton"

interface AdminArticlesPageProps {
  searchParams?: Promise<{pageNumber?:string}>
}


export default async function AdminArticlesPage({
  searchParams,
}:AdminArticlesPageProps ) {

  const resolvedSearchParams = await searchParams
  const pageNumber = resolvedSearchParams?.pageNumber ?? "1"


  const cookiesStore = await cookies()
  const token = cookiesStore.get("jwtToken")?.value

  if (!token) {
    redirect("/")
  }

  const payload = verifyTokenForPage(token)

  if (!payload?.isAdmin) {
    redirect("/")
  }

  const articles: Article[] = await getArticles(pageNumber)
  const count = await getCount()
  const pages = Math.ceil(count / ARTICLE_PER_PAGE)

  return (
    <section className="p-5">
      <h1 className="mb-7 text-2xl font-semibold text-gray-700">
        Articles
      </h1>

      <table className="table w-full text-left mb-5">
        <thead>
          <tr>
            <th className="p-1 lg:p-2">Title</th>
            <th className="hidden lg:inline-block">Created At</th>
            <th className="p-1 lg:p-2">Action</th>
            <th className="hidden lg:inline-block"></th>
          </tr>
        </thead>

        <tbody>
          {articles.map(article => (
            <tr
              key={article.id}
              className="border-b border-t border-gray-300"
            >
              <td className="p-3 text-gray-700">
                {article.title}
              </td>

              <td className="hidden lg:inline-block text-gray-700 p-3">
                {new Date(article.createdAt).toDateString()}
              </td>

<td className="p-3">
  <div className="flex gap-2">
    <Link
      href={`/admin/articles-table/edit/${article.id}`}
      className="bg-green-600 font-bold text-white rounded-lg p-2"
    >
      Edit
    </Link>
    <DeleteArticleButton articleId={article.id} />
  </div>
</td>

              <td className="hidden lg:inline-block">
                <Link
                  href={`/articles/${article.id}`}
                  className="bg-purple-700 text-white rounded-lg p-2"
                >
                  Read More
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        pageNumber={parseInt(pageNumber)}
        pages={pages}
        route="/admin/articles-table"
      />
    </section>
  )
}
