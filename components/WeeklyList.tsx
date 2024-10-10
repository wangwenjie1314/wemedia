import { WeeklyPost } from "@/types/weekly";
import dayjs from "dayjs";
import Link from 'next/link';
// import { usePathname } from 'next/navigation';

export default async function WeeklyList({
  isSide,
  posts,
}: {
  isSide?: boolean;
  posts: WeeklyPost[];
}) {
  // const pathname = usePathname();
  // 过滤掉配置hide的帖子
  const visiblePosts = posts.filter(post => {
    if (!post.metadata.hide) {
      return post
    } 
  });

  return (
    <ul className="flex flex-col gap-4">
      {visiblePosts.map((post) => (
        <li
          id={post.id}
          key={post.metadata.slug}
          className="flex flex-col sm:flex-row gap-4 items-start"
        >
          {isSide ? (
            <></>
          ) : (
            <span className="text-[#8585a8] min-w-28">
              {dayjs(post.metadata.date).format("YYYY-MM-DD")}
            </span>
          )}
          <Link
            href={`/weekly/${post.metadata.slug}`}
            className="link-default truncate transition-colors duration-500 ease-in-out"
          >
            {post.metadata.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
