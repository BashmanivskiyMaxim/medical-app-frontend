import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import HeaderLayout from "@/components/Header";
import FooterLayout from "@/components/Footer";

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <AntdRegistry>
        <HeaderLayout />
        {children}
        <FooterLayout />
      </AntdRegistry>
    </body>
  </html>
);

export default RootLayout;
