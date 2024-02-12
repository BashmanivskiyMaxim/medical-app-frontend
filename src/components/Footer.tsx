"use client";
import React from "react";
import { Layout, theme } from "antd";

const { Footer } = Layout;

const FooterLayout: React.FC = () => {
  return (
    <Layout>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default FooterLayout;
