import React, { useState } from "react";
import {Link} from "react-router-dom"
import "./styles.scss";

const Search = () => {
  const [value, setValue] = useState("");
  return (
    <div className="header-search">
      <div className="grid-100">
        <div className="row">
          <div className=" form col c-12">
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setValue(()=>e.target.value);
              }}
              placeholder="Sản phẩm bạn muốn tìm..."
            />
            <span>
              <Link to={`/search?query=${value}`}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
