import { notFound } from 'next/navigation';

import dataBlog from "@/data/dataBlog";

import BlogMainSection from '@/components/shared/sections/blogMainSection';
import BlogInfoSection from '@/components/shared/sections/blogInfoSection';
import { PrevPage } from "@/components/shared/prevPage";

interface Params {
  params: {
    blogId: string;
  };
}
export async function generateStaticParams() {
  return dataBlog.map((blog) => ({
    blogId: blog.page.toLowerCase(),
  }));
}

export default async function TourDetails({ params }: Params) {
  const { blogId } = params;
  const blog = dataBlog.find((blog) => blog.page.toLowerCase() === blogId);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <BlogMainSection blog={blog} />
      <BlogInfoSection info={blog.info} />
      <PrevPage />
    </>
  );
}