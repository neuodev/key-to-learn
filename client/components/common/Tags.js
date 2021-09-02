import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/dist/client/router";

const className =
  "lowercase mr-1 p-1 px-1.5 text-sm font-medium rounded-md  bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-50 xl:text-xs";

const Tags = ({ tags }) => {
  const router = useRouter();
  return (
    <div className="flex items-center">
      <div className={className + "rounded-full"}>
        {/search/g.test(router.asPath) ? (
          <Link href="/search">
            <FontAwesomeIcon icon={faTag} />
          </Link>
        ) : (
          <FontAwesomeIcon icon={faTag} />
        )}
      </div>
      {tags.level && (
        <Link href={`/search?domain.level=${tags.level}`}>
          <div className={className}>{tags.level}</div>
        </Link>
      )}
      {tags.categories.length > 0 && (
        <Link href={`/search?domain.categories=${tags.categories[0]}`}>
          <div className={className}>{tags.categories[0]}</div>
        </Link>
      )}
      {tags.subcategory.length > 0 && (
        <Link href={`/search?domain.subcategory=${tags.subcategory}`}>
          <div className={className}>{tags.subcategory[0]}</div>
        </Link>
      )}
    </div>
  );
};

export default Tags;
