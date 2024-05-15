import FlightSearchOptions from "./filghtSearchOptions";

export default function FilghtLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return(
        <div className="justify-center">
            <FlightSearchOptions/>
            {children}
        </div>
    )
}