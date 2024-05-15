import React from 'react';
import { TimePicker, Table } from 'antd';
import TimeReception from './TimeReception';

interface TimeReceptionListProps {
    times: string[];
}

const chunk = (array: any[], size: number): any[][] => {
    return array.reduce((chunks: any[][], item: any, i: number) => {
        if (i % size === 0) {
            chunks.push([item]);
        } else {
            chunks[chunks.length - 1].push(item);
        }
        return chunks;
    }, []);
};

const TimeReceptionList: React.FC<TimeReceptionListProps> = ({ times }) => {
    const timeChunks = chunk(times, 6);
    const tableData = timeChunks.map((chunk, index) => ({
        key: index,
        times: chunk,
    }));

    const columns = [
        {
            title: 'Доступний для запису час',
            dataIndex: 'times',
            key: 'times',
            render: (times: string[]) => (
                <div className="flex">
                    {times.map((time, index) => (
                        <div key={index} className="mr-2">
                            <TimeReception date={time} active={false} />
                        </div>
                    ))}
                </div>
            ),
        },
    ];

    return (
        <Table
            dataSource={tableData}
            columns={columns}
            pagination={false} 
            bordered
        />
    );
};

export default TimeReceptionList;
