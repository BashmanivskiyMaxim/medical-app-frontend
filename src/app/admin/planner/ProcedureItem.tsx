import React from 'react';
import { Card, Rate } from 'antd';
import TimeReceptionModal from './TimeReceptionModal';

export interface ProcedureItemProps {
    procName: string;
    procDesc: string;
    averageRating: number;
    doctor: string;
}

const ProcedureItem: React.FC<ProcedureItemProps> = ({
    procName,
    procDesc,
    averageRating,
    doctor,
}: ProcedureItemProps) => {
    return (
        <div>
            <Card
                title={procName}
                style={{ maxWidth: 400 }}
                className="shadow-md p-4 m-6 rounded-md"
            >
                <p className='mb-4'>{procDesc}</p>
                <p className='mb-4'>Оцінка: <Rate disabled defaultValue={averageRating} /></p>
                <p className='mb-4'>Лікар: {doctor}</p>
                <TimeReceptionModal />
            </Card>
        </div>
    );
};

export default ProcedureItem;
