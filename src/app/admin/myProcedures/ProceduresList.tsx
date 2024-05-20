'use client';

import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import Loader from '@/components/Loader';

import { ProcedureForPatient } from '@/types/patientProcedure.types';

import { usePatientProceduresForPatient } from '@/hooks/usePatientProceduresForPatient';

import PastProcedures from './pastProcedures';
import TodayProcedures from './todayProcedures';

const ProceduresList: React.FC = () => {
    const { data, isLoading } = usePatientProceduresForPatient();
    const [todayProcedures, setTodayProcedures] = useState<ProcedureForPatient[]>([]);
    const [pastProcedures, setPastProcedures] = useState<ProcedureForPatient[]>([]);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            const today = dayjs().format('YYYY-MM-DD');

            const todayProcs = data.filter(
                (procedure: ProcedureForPatient) =>
                    dayjs(procedure.procedureDate).format('YYYY-MM-DD') === today
            );
            const pastProcs = data.filter(
                (procedure: ProcedureForPatient) =>
                    dayjs(procedure.procedureDate).format('YYYY-MM-DD') < today
            );

            setTodayProcedures(todayProcs);
            setPastProcedures(pastProcs);
        }
    }, [data]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className='container mx-auto'>
            <TodayProcedures procedures={todayProcedures} />
            <PastProcedures procedures={pastProcedures} />
        </div>
    );
};

export default ProceduresList;
