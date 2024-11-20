import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UserMain from "../pages/user/UserMain";
import ContractManagerMain from "../pages/contractManager/ContractManagerMain";
import RequestManagerMain from "../pages/requestManager/RequestManagerMain";
import RequestManagement from "../pages/user/RequestManagement";
import CreateContract from "../pages/contractManager/CreateContract";
import UpdateContract from "../pages/contractManager/UpdateContract";
import RequestDetail from "../pages/contractManager/RequestDetail";
import ContractList from "../pages/contractManager/ContractList";
import IndexManagement from "../pages/user/IndexManagement";
import CreateEvaluationItem from "../pages/contractManager/CreateEvaluationItem";
import EvaluationItemDetail from "../pages/contractManager/EvaluationItemDetail";
import IndicatorCalculator from "../pages/contractManager/IndicatorCalculator";
import DetailIndex from "../pages/user/DetailIndex";
import UpdateEvaluationItem from "../pages/contractManager/UpdateEvaluationItem";
import ProtectedRoute from "../components/common/ProtectedRoute";
import RequestAllocation from "../pages/contractManager/RequestAllocation";
import RequestManagerStatus from "../pages/requestManager/RequestManagerStatus";
import EstimateIndicatorEdit from "../pages/contractManager/EstimateIndicatorEdit";
import StatisticsResults from "../pages/contractManager/StatisticsResults";
import YearIndicator from "../pages/contractManager/YearIndicator";
import StatisticsPdf from "../pages/contractManager/StatisticsPdf";
import UserYearIndicator from "../pages/user/UserYearIndicator";

const LoginPage = lazy(() => import("../pages/login/LoginPage"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" index element={<LoginPage />} />
          {/* 사용자 권한 페이지들 */}
          <Route
            path="/user/indexManagement"
            element={
              <ProtectedRoute allowedRoles={["ROLE_USER"]}>
                <IndexManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/indexManagement/detail/:evaluationItemId/:date"
            element={
              <ProtectedRoute allowedRoles={["ROLE_USER"]}>
                <DetailIndex />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={["ROLE_USER"]}>
                <UserMain />
              </ProtectedRoute>
            }
          />
          <Route path="/user/yearIndicator" element={<UserYearIndicator />} />
          <Route
            path="/user/requestManagement"
            element={
              <ProtectedRoute allowedRoles={["ROLE_USER"]}>
                <RequestManagement />
              </ProtectedRoute>
            }
          />
          {/* 요청 관리자 권한 페이지 */}
          <Route
            path="/requestManager"
            element={
              <ProtectedRoute allowedRoles={["ROLE_REQUEST_MANAGER"]}>
                <RequestManagerMain />
              </ProtectedRoute>
            }
          />
          <Route
            path="/requestManager/status"
            element={
              <ProtectedRoute allowedRoles={["ROLE_REQUEST_MANAGER"]}>
                <RequestManagerStatus />
              </ProtectedRoute>
            }
          />
          {/* 계약 관리자 관련 페이지 */}
          <Route
            path="/contractManager"
            element={
              <ProtectedRoute allowedRoles={["ROLE_CONTRACT_MANAGER"]}>
                <ContractList />
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
            path="/contractManager/requestAllocation/request/:requestId"
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
            element={
              <ProtectedRoute allowedRoles={["ROLE_CONTRACT_MANAGER"]}>
                <UpdateEvaluationItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contractManager/statisticsResult"
            element={
              <ProtectedRoute allowedRoles={["ROLE_CONTRACT_MANAGER"]}>
                <StatisticsResults />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contractManager/indicatorCalculator"
            element={
              <ProtectedRoute allowedRoles={["ROLE_CONTRACT_MANAGER"]}>
                <IndicatorCalculator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contractManager/requestAllocation"
            element={
              <ProtectedRoute allowedRoles={["ROLE_CONTRACT_MANAGER"]}>
                <RequestAllocation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contractManager/autoCal"
            element={
              <ProtectedRoute allowedRoles={["ROLE_CONTRACT_MANAGER"]}>
                <EstimateIndicatorEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contractManager/yearIndicator"
            element={
              <ProtectedRoute allowedRoles={["ROLE_CONTRACT_MANAGER"]}>
                <YearIndicator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contractManager/indexManagement/detail/:evaluationItemId/:date"
            element={
              <ProtectedRoute allowedRoles={["ROLE_CONTRACT_MANAGER"]}>
                <StatisticsPdf />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
