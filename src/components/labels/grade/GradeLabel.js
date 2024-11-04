import React from "react";
import "./GradeLabel.css";

const GradeLabel = ({ initialData }) => {
  const data = initialData.filter((item, index) => index < 3);

  return (
    <>
      <div className="gradeTitle">
        <p>목표</p>
        <p>최소</p>
        <p>최대</p>
      </div>
      <div className="gradeInfo">
        {data.map((item, index) => (
          <div key={index}>
            <div className="gradeDiv">
              <p>{item.grade}</p>
              <p>
                {item.min} {item.minInclusive ? "이상" : "초과"}
              </p>
              <p>
                {item.max} {item.maxInclusive ? "이하" : "미만"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GradeLabel;
