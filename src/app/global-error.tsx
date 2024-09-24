"use client"


export default function GlobalError({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {
    return (
        <html>
            <body>
                <div>
                    <h1>{error.message}</h1>
                    <button onClick={reset} className="bg-red-800 rounded-lg test-white w-[120px] h-[40px]">
                        다시 시도하기
                    </button>
                </div>
            </body>
        </html>
    )}   