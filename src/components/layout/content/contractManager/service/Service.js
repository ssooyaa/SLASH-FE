import React, { useState } from "react";
import "../../../../../styles/Content.css";
import { FaBars } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import ServiceForm from "./serviceForm/ServiceForm";

const Service = ({ isNavOpen, toggleNav, effectClass }) => {
  //getAPI생성 후 제거 예정
  const mockData = {
    categoryId: 1,
    category: "장애 적기 가동률",
    purpose: "서비스가 돌아가는 시간",
    weight: 50,
    period: null,
    formula: null,
    unit: null,
    serviceTargets: [
      {
        grade: "A",
        min: 90.0,
        minInclusive: true,
        max: 100.0,
        maxInclusive: false,
        score: 95.5,
      },
      {
        grade: "B",
        min: 90.0,
        minInclusive: true,
        max: 100.0,
        maxInclusive: false,
        score: 95.5,
      },
    ],
    taskTypes: [],
  };

  return (
    <div
      className={`pageContent pageContentOffcanvas${effectClass} ${
        isNavOpen ? "jsOpened" : ""
      }`}
    >
      <button
        className={`navOpenBtn ${isNavOpen ? "jsHidden" : ""}`}
        onClick={toggleNav}
      >
        <FaBars />
      </button>

      <div className="profileSection">
        <div className="profileInfo">
          <IoPersonCircle className="profileImg" />
          <span className="welcomeText">관리자님 환영합니다</span>
        </div>
      </div>
      <hr className="divider" />
      <div className="content">
        <div className="contentBox">
          <ServiceForm />
        </div>
      </div>
    </div>
  );
};
export default Service;
