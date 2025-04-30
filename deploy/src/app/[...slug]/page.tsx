import fs from 'fs';
import path from 'path';
import React from 'react';
import { Metadata } from 'next';

/**
 * Dynamic slug page component that renders HTML content from the Pages directory
 * Matches the file path based on the slug array
 */
export default async function Page({ params }: { params: { slug: string[] } }): Promise<React.ReactElement> {
  const slugArray = params?.slug ?? ['index'];
  const fileName = slugArray.join('/');
  const filePath = path.join(process.cwd(), 'Pages', `${fileName}.html`);

  let html = '';

  try {
    html = await fs.promises.readFile(filePath, 'utf8');
  } catch {
    // File not found or other error reading the file
    return <p>Page not found.</p>;
  }

  const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const content = match ? match[1] : html;

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

/**
 * Generates metadata for the page based on the slug
 */
export async function generateMetadata(
  { params }: { params: { slug: string[] } }
): Promise<Metadata> {
  const slugArray = params?.slug ?? ['index'];
  const fileName = slugArray.join('/');

  // Format the title: capitalize first letter and add site name
  const formattedTitle = fileName.charAt(0).toUpperCase() + fileName.slice(1);

  return {
    title: `${formattedTitle} - Homeless Helpers`,
    description: `Information about ${formattedTitle} for those experiencing homelessness`,
  };
}

/**
 * Generates static params for all HTML files in the Pages directory for static export
 */
export async function generateStaticParams() {
  const pagesDir = path.join(process.cwd(), 'Pages');
  let files: string[] = [];
  try {
    files = await fs.promises.readdir(pagesDir);
  } catch {
    return [];
  }
  return files
    .filter((file) => file.endsWith('.html'))
    .map((file) => {
      const slug = file.replace(/\.html$/, '').split('/');
      return { slug };
    });
}

export const dynamicParams = false;
