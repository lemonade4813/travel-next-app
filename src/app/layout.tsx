import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import RQProvider from "@/components/RQProvider";
import HeaderMenu from "./HeaderMenu";
import { LoginProvider } from "@/util/components/context/LoginContext";
import MainNav from "./MainNav";
import Modal from "@/components/AlertModalLayout";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="ko">
      <head>
        <Script type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=0c9800fcf2fe90b7dbc10f3cb1e562ed&autoload=false&libraries=services`}
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-gray-50">
       
        <script src='https://cdn.iamport.kr/v1/iamport.js' async></script>
        <div id="modal-root"></div>
          <LoginProvider>
            <div className="relative w-full">
              <header className="flex items-center justify-between h-14 px-6 shadow-md bg-white">
              <h1 className="font-['GochiHand'] text-2xl text-red-800"><Link href='/'>Bon Voyage</Link></h1>
                <HeaderMenu/>
              </header>
              <MainNav/>
              <RQProvider>
                <section className="flex justify-center items-center">
                  {children}
                </section>
              </RQProvider>
              <Modal/>  
            </div>
          </LoginProvider>
      </body>
    </html>
  );
}