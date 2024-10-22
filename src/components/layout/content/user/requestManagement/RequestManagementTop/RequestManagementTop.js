import React from "react";
import "./RequestManagementTop.css";
import statics from "../../../../../../assets/images/static.png";
import check from "../../../../../../assets/images/check.png";
import processing from "../../../../../../assets/images/processing.png";
import stamp from "../../../../../../assets/images/stamp.png";

const RequestSelectTop = () => {
  return (
    <div className="row">
      <div className="componentBox" id="statics">
        <div className="row">
          <img src={statics} alt="통계이미지" />
          <div className="column">
            <h3>
              <span className="number">15</span> 건
            </h3>
            <span>총 건수</span>
          </div>
        </div>
      </div>

      <div className="componentBox" id="stamp">
        <div className="row">
          <img src={stamp} alt=""></img>
          <div className="column">
            <h3>
              <span className="number">15</span> 건
            </h3>
            <span>접수완료</span>
          </div>
        </div>
      </div>

      <div className="componentBox" id="processing">
        <div className="row">
          <img src={processing} alt=""></img>
          <div className="column">
            <h3>
              <span className="number">15</span> 건
            </h3>
            <span>총 건수</span>
          </div>
        </div>
      </div>

      <div className="componentBox" id="check">
        <div className="row">
          <img src={check} alt=""></img>
          <div className="column">
            <h3>
              <span className="number">15</span> 건
            </h3>
            <span>총 건수</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSelectTop;
