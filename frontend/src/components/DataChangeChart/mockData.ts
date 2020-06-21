const chartMockData:any = [
  {
    name: 'name1',
    date: '2017-10-10',
    type: 'type1',
    value: '12',
  },
  {
    name: 'name2',
    date: '2017-10-11',
    type: 'type1',
    value: '1111',
  },
  {
    name: 'name3',
    date: '2017-10-12',
    type: 'type1',
    value: '222',
  },
  {
    name: 'name4',
    date: '2017-10-10',
    type: 'type2',
    value: '1000',
  },
  {
    name: 'name5',
    date: '2017-10-11',
    type: 'type2',
    value: '1111',
  },
  {
    name: 'name6',
    date: '2017-10-12',
    type: 'type2',
    value: '222',
  }
]
chartMockData.columns = ['name', 'type', 'value', 'date']

export default {
  chartMockData

}