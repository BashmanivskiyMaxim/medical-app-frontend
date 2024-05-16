'use client'

import { ClockCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import Clock from 'react-live-clock';

const { Title } = Typography;

const ClockItem = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <ClockCircleOutlined className="text-2xl" />
        <span className="text-2xl ml-1">{' '}</span>
      </div>
      <div className="flex items-center">
        <Clock
          className='text-2xl'
          format={'HH:mm:ss'}
          ticking={true}
          timezone={'Europe/Kiev'}
        />
        <span className="text-2xl ml-1">{' '}</span>
      </div>
      <p className="text-2xl">Записи на процедури оновлюються кожен день о 00:00</p>
    </div>
  );
}

export default ClockItem;
