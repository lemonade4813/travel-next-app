import RQProvider from "@/components/RQProvider";

export default function FilghtLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return(
          <RQProvider>
            <div className="justify-center">
              {children}
            </div>
          </RQProvider>
    )
}