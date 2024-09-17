import { HydrationBoundary, QueryClient, dehydrate, QueryKey, QueryFunction } from "@tanstack/react-query";

type PrefetchOptions = {
    queryKey: QueryKey;
    queryFn: QueryFunction;
};

type Props = {
    prefetchOptions: PrefetchOptions | PrefetchOptions[];
    children: React.ReactNode;
};

export async function PrefetchBoundary({ prefetchOptions, children }: Props) {
    const queryClient = new QueryClient();

    Array.isArray(prefetchOptions)
    ? await Promise.all(prefetchOptions.map((prefetchOption) => queryClient.prefetchQuery(prefetchOption)))
    : await queryClient.prefetchQuery(prefetchOptions);



    return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}