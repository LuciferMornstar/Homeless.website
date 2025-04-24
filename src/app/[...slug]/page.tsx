import fs from 'fs';
import path from 'path';
import React from 'react';
import { Metadata } from 'next';

/**
 * Dynamic slug page component that renders HTML content from the Pages directory
 * Matches the file path based on the slug array
 */
export default async function Page({ params }: { params: Promise<{ slug: string[] }> }): Promise<React.ReactElement> {
  const { slug: slugArrayRaw = ['index'] } = await params;
  const slugArray = slugArrayRaw ?? ['index'];
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
  { params }: { params: Promise<{ slug: string[] }> }
): Promise<Metadata> {
  const { slug: slugArrayRaw = ['index'] } = await params;
  const slugArray = slugArrayRaw ?? ['index'];
  const fileName = slugArray.join('/');
  
  // Format the title: capitalize first letter and add site name
  const formattedTitle = fileName.charAt(0).toUpperCase() + fileName.slice(1);
  
  return {
    title: `${formattedTitle} - Homeless Helpers`,
    description: `Information about ${formattedTitle} for those experiencing homelessness`,
  };
}
