import React from 'react';
import { Card, Rate } from 'antd';
import TimeReceptionModal from './TimeReceptionModal';

export interface ProcedureItemProps {
    procName: string ;
    procDesc: string 
    averageRating: number
    specialty: string
    qualification: string
}

const ProcedureItem: React.FC<ProcedureItemProps> = ({
    procName,
    procDesc,
    averageRating,
    specialty,
    qualification,
}: ProcedureItemProps) => {
    return (
        <div>
            <Card
                title={procName}
                style={{ maxWidth: 400 }}
                className="shadow-md p-4 m-6 rounded-md"
            >
                <p className='mb-4'>{procDesc}</p>
                <p className='mb-4'>Оцінка:</p><Rate disabled defaultValue={averageRating} />
                <p className='mb-4'>Лікар: {specialty}</p>
                <p className='mb-4'>Кваліфікація: {qualification}</p>
                <TimeReceptionModal />
            </Card>
        </div>
    );
};

export default ProcedureItem;
