import { Inter } from "next/font/google";
// import { __variables } from "@/constants/Variables";
import AntdDesign from "@/provider/AntdDesign";
import AuthProvider from "@/provider/AuthProvider";
import NextProgressBar from "@/provider/NextProgressBar";
import QueryClientProvider from "@/provider/QueryClientProvider";
import "@/styles/antd.css";
import "@/styles/font.css";
import '@/styles/json-viewer.css';
import "filepond/dist/filepond.min.css";
import "./globals.css";
import ProtectedRoute from "@/provider/ProtectedRoute";


const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: __variables.names.appName,
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" dir="ltr">
      <body className={inter.className}>

        <AuthProvider>
          <ProtectedRoute>
            <AntdDesign>
              <QueryClientProvider>
                <NextProgressBar />
                {children}
              </QueryClientProvider>
            </AntdDesign>
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
