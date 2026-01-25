'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'
import { Button } from './ui/button';

function Pagination({
  page,
  totalPages,
  urlParamName = 'page'
}: {
  page: number,
  totalPages: number,
  urlParamName?: string
}) {

  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString() || '')
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const goToPage = (p: number) => {
    router.push(`?${createQueryString(urlParamName, String(p))}`)
  }

  const getPages = () => {
    const pages = []
    const start = Math.max(1, page - 2)
    const end = Math.min(totalPages, page + 2)

    if (start > 1) pages.push(1, '...')

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < totalPages) pages.push('...', totalPages)

    return pages
  }

  return (
    <div className='flex gap-2 items-center justify-center py-4'>

      <Button
        variant='outline'
        disabled={page <= 1}
        onClick={() => goToPage(page - 1)}
      >
        Prev
      </Button>

      {getPages().map((p, i) =>
        p === '...' ? (
          <span key={i}>...</span>
        ) : (
          <Button
            key={i}
            variant={p === page ? 'default' : 'outline'}
            onClick={() => goToPage(Number(p))}
            className='rounded-full w-8 h-8'
          >
            {p}
          </Button>
        )
      )}

      <Button
        variant='outline'
        disabled={page >= totalPages}
        onClick={() => goToPage(page + 1)}
      >
        Next
      </Button>

    </div>
  )
}

export default Pagination
