import React, {useEffect, useState} from 'react';
import {getManagerTaskStatus} from "../../../../../../api/UserService";
import "./RequestDetailBottom.css"

const RequestDetailBottom = () => {
    const [result, setResult] = useState(null);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const fetchData = async () => {
            try {
                const response = await getManagerTaskStatus();
                console.log("초기 데이터:", response.data);
                setResult(
                    response.data
                )
            } catch (error) {
                console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
            }
        };

        fetchData(); // 데이터 요청
    }, []); // 빈 배열로 설정하여 컴포넌트가 마운트될 때 한 번만 실행


    return (
        <div>
            <div className="rdBox">
                <h3>업무 현황</h3>
                <table>
                    <thead>
                    <tr>
                        <th>이름</th>
                        <th>할당 건수</th>
                        <th>미처리 건수</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {result ? (
                        result.map((item) => (
                            <tr key={item.managerId}>
                                <td> {item.managerName}</td>
                                <td> {item.totalCount}건</td>
                                <td> {item.inProgressCount}건</td>
                                <td>할당하기</td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td> Loading...</td>
                            <td> Loading...</td>
                            <td> Loading...</td>
                            <td>할당하기</td>
                        </tr>
                    )}
                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default RequestDetailBottom;
