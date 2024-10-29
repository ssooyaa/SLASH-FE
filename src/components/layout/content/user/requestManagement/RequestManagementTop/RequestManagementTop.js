import React from "react";
import "./RequestManagementTop.css";
import statics from "../../../../../../assets/images/static.png";
import check from "../../../../../../assets/images/check.png";
import processing from "../../../../../../assets/images/processing.png";
import stamp from "../../../../../../assets/images/stamp.png";

const RequestSelectTop = () => {
  return (
    <div className="rmRow">
      <div className="componentBox" id="statics">
        <div className="rmRow">
          <img src={statics} alt="통계이미지" />
          <div className="rmColumn">
            <h3>
              <span className="rmNumber">15</span> 건
            </h3>
            <span>총 건수</span>
          </div>
        </div>
      </div>

      <div className="componentBox" id="stamp">
        <div className="rmRow">
          <img src={stamp} alt=""></img>
          <div className="rmColumn">
            <h3>
              <span className="rmNumber">15</span> 건
            </h3>
            <span>접수완료</span>
          </div>
        </div>
      </div>

      <div className="componentBox" id="processing">
        <div className="rmRow">
          <img src={processing} alt=""></img>
          <div className="rmColumn">
            <h3>
              <span className="rmNumber">15</span> 건
            </h3>
            <span>총 건수</span>
          </div>
        </div>
      </div>

      <div className="componentBox" id="check">
        <div className="rmRow">
          <img src={check} alt=""></img>
          <div className="rmColumn">
            <h3>
              <span className="rmNumber">15</span> 건
            </h3>
            <span>총 건수</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSelectTop;
