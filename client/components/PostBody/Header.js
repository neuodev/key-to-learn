import React from "react";

const Header = ({ data }) => {
  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: data.text }} />
    </div>
  );
};

export default Header;
