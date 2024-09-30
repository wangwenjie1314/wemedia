import { PostsByMonth, WeeklyPost } from '@/types/weekly';
import dayjs from 'dayjs';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

/**
 * 支持文件目录递归
 * @param dir 
 * @returns 
 */
async function getFilesRecursively(dir: string): Promise<string[]> {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFilesRecursively(res) : res;
  }));
  return Array.prototype.concat(...files);
}

export async function getWeeklyPosts(): Promise<{ posts: WeeklyPost[]; postsByMonth: PostsByMonth }> {
  const postsDirectory = path.join(process.cwd(), 'content')
  let filePaths = await getFilesRecursively(postsDirectory)
  filePaths = filePaths.filter(file => path.extname(file) === '.mdx')
  filePaths = filePaths.reverse()

  const posts = await Promise.all(
    filePaths.map(async (filePath) => {
      console.log('fullPathfullPathfullPath', filePath)
      const fileContents = await fs.promises.readFile(filePath, 'utf8')

      const { data, content } = matter(fileContents)
      const month = dayjs(data.date).format('YYYY-MM-DD').slice(0, 7);

      return {
        id: month,
        metadata: data, // slug/url title date
        title: data.title,
        slug: data.slug,
        content,
      }
    })
  )

  // Group by month
  const postsByMonth: PostsByMonth = posts.reduce((acc: PostsByMonth, post: WeeklyPost) => {
    const month = dayjs(post.metadata.date).format('YYYY-MM-DD').slice(0, 7);
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(post);
    return acc;
  }, {});

  return {
    posts,
    postsByMonth
  }
}
