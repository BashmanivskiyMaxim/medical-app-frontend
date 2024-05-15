import React from 'react';
import { Card, Row, Col } from 'antd'; // Додано імпорт для Row та Col з Ant Design
import ProcedureItem, { ProcedureItemProps } from './ProcedureItem';

interface ProcedureListProps {
    procedures: ProcedureItemProps[];
}

const ProcedureList: React.FC<ProcedureListProps> = ({ procedures }) => {
    return (
        <>
            <Row gutter={[16, 16]}>
                {procedures.map((procedure, index) => (
                    <Col span={6} key={index}>
                        <ProcedureItem
                            procName={procedure.procName}
                            procDesc={procedure.procDesc}
                            averageRating={procedure.averageRating}
                            doctor={procedure.doctor}
                        />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default ProcedureList;
