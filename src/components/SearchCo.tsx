import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { mockPosts } from "../mock/posts";
import { getImageUrl } from "../utils/imageUtils";
import Link from "next/link";

// Helper function to extract slug string from union type
function getSlugString(slug: string | { _type: string; current: string; [key: string]: any }): string {
  return typeof slug === 'string' ? slug : slug.current;
}

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredPosts = mockPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.categories.some((cat) =>
        cat.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={`/blog/${getSlugString(post.slug)}`}>
                <div className="relative h-48">
                  <img
                    src={getImageUrl(post.mainImage)}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    {post.categories.map((category, index) => (
                      <span
                        key={`${category.title}-${index}`}
                        className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full"
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={post.author.image}
                        alt={post.author.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {post.author.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          {filteredPosts.length === 0 && (
            <div className="text-center py-10 col-span-full">
              <p className="text-gray-500">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

