import React from "react";
import styled from "styled-components";

const P = styled.div`
  a {
    color: #60a5fa;

    &:hover {
      text-decoration: underline;
    }
  }
`;
const Text = ({ data }) => {
  return (
    <div className="mb-5 leading-relaxed post-p-color  post-p ">
      <P dangerouslySetInnerHTML={{ __html: data.text }} />
    </div>
  );
};

export default Text;
