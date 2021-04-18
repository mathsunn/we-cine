import React from "react";

interface Props {
  count: number;
  average: number;
}

const Star: React.FC<Props> = ({ count, average }) => {
  return (
    <ul className="ratings">
      {Array.from(Array(count), (e, i) => {
        const $starClass = i < average ? "selected" : "";

        return <li className={`star ${$starClass}`} key={i}></li>;
      })}
    </ul>
  );
};

export default Star;
