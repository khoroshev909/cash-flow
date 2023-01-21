import React,{FC, useEffect, useState} from 'react';
import { blueGrey, blue } from '@mui/material/colors';
import typographyClasses from '@mui/material/Typography/typographyClasses';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import {Title} from '../../components';
import dayjs from 'dayjs'
import {IFund} from '../../store/funds/types';

type chartData = { date: string, balance: number }[]

interface ChartProps {
  funds: IFund[]
}

export const Chart:FC<ChartProps> = React.memo(({ funds }) => {

  const [data, setData] = useState<chartData>([])

  useEffect(() => {
    if (funds?.length > 2) {
      const data = funds.map(fund => ({ date: dayjs(fund.createdAt).format('D/M'), balance: fund.balance }))
      setData(data)
    } else {
      setData([])
    }
  }, [funds])

  return (
    <React.Fragment>
      <Title>Аналитика</Title>
      {data.length > 4 ? (
      <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{
          top: 16,
          right: 16,
          bottom: 0,
          left: 24,
        }}
      >
        <XAxis
          dataKey="date"
          stroke={blueGrey[700]}
          className={typographyClasses.body2} />
        <YAxis
          stroke={blueGrey[700]}
          className={typographyClasses.body2}
        >
        </YAxis>
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="balance"
          stroke={blue[700]}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
      ) : (
        <h4>Для получения аналитики нужно минимут пять операций по счёту</h4>
      )}
    </React.Fragment>
  )
})
