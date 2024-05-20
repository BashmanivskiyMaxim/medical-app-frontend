import React from 'react';

import { ProcedureForPatient } from '@/types/patientProcedure.types';

import ProcedureItem from './ProcedureItem';

interface TodayProceduresProps {
    procedures: ProcedureForPatient[];
}

const TodayProcedures: React.FC<TodayProceduresProps> = ({ procedures }) => {
    return (
        <div className='my-6'>
            <h2 className='text-2xl font-bold mb-4'>Процедури на сьогодні</h2>
            {procedures.length === 0 ? (
                <p>Немає запланованих процедур на сьогодні</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {procedures.map((procedure) => (
                        <ProcedureItem
                            key={`${procedure.procedure.id}-${procedure.appointmentTime}`}
                            doctor={procedure.doctor}
                            procedure={procedure.procedure}
                            procedureDate={procedure.procedureDate}
                            appointmentTime={procedure.appointmentTime}
                            report={procedure.report.report}
                            rating={procedure.rating}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TodayProcedures;
