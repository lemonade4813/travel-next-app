import { HydrationBoundary, QueryClient, dehydrate, QueryKey, QueryFunction } from "@tanstack/react-query";

type PrefetchOptions = {
    queryKey: QueryKey;
    queryFn: QueryFunction;
};

type Props = {
    prefetchOptions: PrefetchOptions;
    children: React.ReactNode;
};

export async function PrefetchBoundary({ prefetchOptions, children }: Props) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(prefetchOptions);

    return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}