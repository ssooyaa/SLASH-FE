import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import UserMain from "../pages/user/UserMain";
import ContractManagerMain from "../pages/contractManager/ContractManagerMain";
import RequestManagerMain from "../pages/requestManager/RequestManagerMain";
import RequestManagement from "../pages/user/RequestManagement";
import CreateContract from "../pages/contractManager/CreateContract";
import ContractInformation from "../pages/contractManager/ContractInformation";
import UpdateContract from "../pages/contractManager/UpdateContract";
import RequestDetail from "../pages/contractManager/RequestDetail";
import ContractList from "../pages/contractManager/ContractList";
import RequestManagerStatus from "../pages/requestManager/RequestManagerStatus";

//BrowserRouter를 Router로 감싸는 이유는,
//SPA의 장점인 브라우저가 깜빡이지 않고 다른 페이지로 이동할 수 있게 만들어줍니다!
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*
                        Routes안에 이렇게 작성합니다. 
                        path는 우리가 흔히 말하는 사용하고싶은 "주소"를 넣어주면 됩니다.
                        element는 해당 주소로 이동했을 때 보여주고자 하는 컴포넌트를 넣어줍니다.
        */}
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<UserMain />} />
        <Route path="/user/requestManagement" element={<RequestManagement />} />
        <Route path="/requestManager" element={<RequestManagerMain />} />
        <Route path="/requestManager/status" element={<RequestManagerStatus />} />
        <Route path="/contractManager" element={<ContractManagerMain />} />
        <Route
          path="/contractManager/updateContract/:contractId"
          element={<UpdateContract />}
        />
        <Route
          path="/contractManager/contract/:contractId"
          element={<ContractInformation />}
        />
        <Route
          path="/contractManager/createContract"
          element={<CreateContract />}
        />
        <Route
          path="/contractManager/contractList"
          element={<ContractList />}
        />
        <Route
          path="/contractManager/request/:requestId"
          element={<RequestDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
