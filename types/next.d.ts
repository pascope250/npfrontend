// types/next.d.ts
import type { Metadata } from 'next';

declare module 'next' {
  interface PageProps {
    params: { [key: string]: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  }
}