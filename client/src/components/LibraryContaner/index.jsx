import React from "react";
import Blog from "../Blog";
import BlogAside from "../Blog-aside";
import Breadcrumb from "../BreadCrumb";

import "./style.scss";

const LibraryContainer = () => {
  return (
    <div className="library-container">
      <div className="grid wide pt-2 pb-2 mb-4 border-bottom">
        <Breadcrumb />
      </div>
      <div className="grid wide">
        <div className="row">
          <div className="col l-9">
            <section className="left-content">
              <h1>Tin tức</h1>
              <section className="list-blogs blog-xxx">
                <Blog />
                <Blog />
                <Blog />
                <Blog />
              </section>
            </section>
          </div>
          <div className="col l-3">
            <aside className="right-content">
              <h2 className="title-head">
                <span->
                  <a href="/tin-tuc">Tin tức liên quan</a>
                </span->
              </h2>
              <div>
                <BlogAside />
                <BlogAside />
                <BlogAside />
                <BlogAside />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryContainer;
