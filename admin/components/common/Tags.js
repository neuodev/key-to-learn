import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

const className =
  "lowercase mr-1 p-1 px-1.5 text-sm font-medium rounded-md  bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-50 truncate";

const Tags = ({ tags }) => {
  return (
    <div className="flex items-center">
      <div className={className + "rounded-full"}>
        <FontAwesomeIcon icon={faTag} />
      </div>
      {tags.level && (
        <Link href={`/search?level=${tags.level}`}>
          <div className={className}>{tags.level}</div>
        </Link>
      )}
      {tags.categories.length > 0 && (
        <Link href={`/search?cat=${tags.categories[0]}`}>
          <div className={className}>{tags.categories[0]}</div>
        </Link>
      )}
      {tags.subcategory.length > 0 && (
        <Link href={`/search?sub=${tags.subcategory}`}>
          <div className={className}>{tags.subcategory[0]}</div>
        </Link>
      )}
    </div>
  );
};

export default Tags;
