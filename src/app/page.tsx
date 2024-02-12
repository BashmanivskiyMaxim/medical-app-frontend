import React from "react";
import { Button } from "antd";
import "../styles/global.css";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <Button type="primary">Primary Button</Button>
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        <span className="blue_gradient">CreativAI</span> is an open-source AI
        prompting tool for modern world to discover, create and share creative
        prompts
      </p>
    </section>
  );
};

export default Home;
