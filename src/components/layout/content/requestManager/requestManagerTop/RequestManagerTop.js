import React, {useEffect, useState} from "react";
import MonthPicker from "../../../../feature/MonthPicker";
import "../../../../feature/MonthPicker.css";
import "./RequestManagerTop.css";
import { PieChart } from "../../../../feature/chart/systemTypeChart/PieChart";
import "../../../../feature/chart/systemTypeChart/PieChart.css";
import {getMonthlyData} from "../../../../../api/RequestManagerService";

const RequestManagerTop = () => {
    const [monthlyData, setMonthlyData] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(
        String(new Date().getMonth() + 1).padStart(2, "0")
    );

    // MonthPicker에서 데이터를 업데이트할 핸들러 함수
    const handleMonthlyDataChange = async (selectedYear, selectedMonth) => {
        console.log("받은 데이터:", selectedYear, selectedMonth);
        const data = await getMonthlyData(selectedYear, selectedMonth);
        setMonthlyData(data.data);
    };

    // 초기 데이터 요청
    useEffect(() => {
        handleMonthlyDataChange(year, month); // 초기 데이터 한 번 호출
    }, []); // 빈 배열로 초기 1회 호출 후 추가 호출 방지

    const REGISTERED = monthlyData?.statusCountList
        ? (monthlyData.statusCountList.find((item) => item.name === "REGISTERED")
            ?.count ?? 0)
        : 0;
    const IN_PROGRESS = monthlyData?.statusCountList
        ? (monthlyData.statusCountList.find((item) => item.name === "IN_PROGRESS")
            ?.count ?? 0)
        : 0;
    const COMPLETED = monthlyData?.statusCountList
        ? (monthlyData.statusCountList.find((item) => item.name === "COMPLETED")
            ?.count ?? 0)
        : 0;
    const TOTAL = REGISTERED + IN_PROGRESS + COMPLETED;

    return (
        <div className="rmRow">
            <div className="rmColumn rm2">
                <div className="rmRow">
                    <div className="rmmBox">
                        <div className="rqqColumn">
                            <span>전체 요청 건수</span>
                            <span className="rqqNumber">{TOTAL}건</span>
                        </div>
                    </div>

                    <div className="rmmBox">
                        <div className="rqqColumn">
                            <span>접수 완료 건수</span>
                            <span className="rqqNumber">{REGISTERED}건</span>
                        </div>
                    </div>

                    <div className="rmmBox">
                        <div className="rqqColumn">
                            <span>처리중인 건수</span>
                            <span className="rqqNumber">{IN_PROGRESS}건</span>
                        </div>
                    </div>

                    <div className="rmmBox">
                        <div className="rqqColumn">
                            <span>처리 완료 건수</span>
                            <span className="rqqNumber">{COMPLETED}건</span>
                        </div>
                    </div>
                </div>

                <div className="rmRow">
                    <div className="pBox">
                        <div className="pColumn">
                            <span>장비유형</span>
                            <PieChart data={monthlyData?.systemCountList}/>
                        </div>
                    </div>

                    <div className="pBox">
                        <div className="pColumn">
                            <span>업무유형</span>
                            <PieChart data={monthlyData?.taskTypeCountList}/>
                        </div>
                    </div>

                    <div className="pBox">
                        <div className="pColumn">
                            <span>TOTAL STATUS</span>
                            <PieChart data={monthlyData?.statusCountList}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mBox rm1">
                <MonthPicker
                    year={year}
                    setYear={setYear}
                    month={month}
                    setMonth={setMonth}
                    onChange={handleMonthlyDataChange}
                />
            </div>
        </div>
    );
};

export default RequestManagerTop;
