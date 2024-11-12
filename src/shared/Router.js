import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/LoginPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../pages/login/Login";
import UserMain from "../pages/user/UserMain";
import ContractManagerMain from "../pages/contractManager/ContractManagerMain";
import RequestManagerMain from "../pages/requestManager/RequestManagerMain";
import RequestManagement from "../pages/user/RequestManagement";
import CreateContract from "../pages/contractManager/CreateContract";
import UpdateContract from "../pages/contractManager/UpdateContract";
import RequestDetail from "../pages/contractManager/RequestDetail";
import ContractList from "../pages/contractManager/ContractList";
import RequestManagerStatus from "../pages/requestManager/RequestManagerStatus";
import IndexManagement from "../pages/user/IndexManagement";
import CreateEvaluationItem from "../pages/contractManager/CreateEvaluationItem";
import EvaluationItemDetail from "../pages/contractManager/EvaluationItemDetail";
import IndicatorCalculator from "../pages/contractManager/IndicatorCalculator";
import DetailIndex from "../pages/user/DetailIndex";
import DetailIndexContent from "../components/layout/content/contractManager/indexManagment/DetailIndexContent";
import UpdateEvaluationItem from "../pages/contractManager/UpdateEvaluationItem";
import ProtectedRoute from "../components/common/ProtectedRoute";

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
        <Route path="/user/indexManagement" element={<IndexManagement />} />
        <Route
          path="/user/indexManagement/detail/:evaluationItemId/:date"
          element={<DetailIndex />}
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["ROLE_USER"]}>
              <UserMain />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/requestManagement"
          element={
            <ProtectedRoute allowedRoles={["ROLE_USER"]}>
              <RequestManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/requestManager"
          element={
            <ProtectedRoute allowedRoles={["ROLE_REQUEST_MANAGER"]}>
              <RequestManagerMain />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contractManager"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CONTRACT_MANAGER"]}>
              <ContractManagerMain />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contractManager/updateContract/:contractId"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CONTRACT_MANAGER"]}>
              <UpdateContract />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contractManager/contractDetail"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CONTRACT_MANAGER"]}>
              <ContractManagerMain />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contractManager/createContract"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CONTRACT_MANAGER"]}>
              <CreateContract />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contractManager/contractList"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CONTRACT_MANAGER"]}>
              <ContractList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contractManager/request/:requestId"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CONTRACT_MANAGER"]}>
              <RequestDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contractManager/addEvaluationItem"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CONTRACT_MANAGER"]}>
              <CreateEvaluationItem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contractManager/evaluationItemDetail"
          element={
            <ProtectedRoute allowedRoles={["ROLE_CONTRACT_MANAGER"]}>
              <EvaluationItemDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contractManager/updateEvaluationItem/:evaluationItemId"
          element={<UpdateEvaluationItem />}
        />

        <Route
          path="/contractManager/indexManagement"
          element={<DetailIndexContent />}
        />
        <Route path="/contractManager/indicatorCalculator"
               element={<IndicatorCalculator/>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
