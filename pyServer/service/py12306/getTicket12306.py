
from flask import Flask, request
import requests
import datetime
import bs4
import re
from sendEmail import sendmail

from city12306 import station_name_dict

mockdata = [{'车次': 'G2389', '始发站': 'HGH', '终点站': 'WHN', '出发时间': '07:39', '抵达时间': '14:05', '经历时间': '06:26', '商务座': '无', '一等座': '6', '二等座': '有', '高级软卧': '', '软卧': '', '动卧': '', '硬卧': '', '软座': '', '硬座': '', '无座': '', '其他': '', '备注': '预订', '车次id': '56000G238910', '起始站位置': '01', '终点站位置': '18'}, {'车次': 'D656', '始发站': 'HGH', '终点站': 'HKN', '出发时间': '08:01', '抵达时间': '13:23', '经历时间': '05:22', '商务座': '', '一等座': '15', '二等座': '有', '高级软卧': '', '软卧': '', '动卧': '', '硬卧': '', '软座': '', '硬座': '', '无座': '无', '其他': '', '备注': '预订', '车次id': '5e0000D65650', '起始站位置': '04', '终点站位置': '15'}, {'车次': 'G594', '始发站': 'HGH', '终点站': 'WHN', '出发时间': '08:16', '抵达时间': '13:02', '经历时间': '04:46', '商务座': '有', '一等座': '有', '二等座': '有', '高级软卧': '', '软卧': '', '动卧': '', '硬卧': '', '软座': '', '硬座': '', '无座': '', '其他': '', '备注': '预订', '车次id': '560000G59461', '起始站位置': '01', '终点站位置': '11'}, {'车次': 'D2262', '始发站': 'HGH', '终点站': 'HKN', '出发时间': '08:44', '抵达时间': '13:55', '经历时间': '05:11', '商务座': '', '一等座': '有', '二等座': '有', '高级软卧': '', '软卧': '', '动卧': '', '硬卧': '', '软座': '', '硬座': '', '无座': '无', '其他': '', '备注': '预订', '车次id': '56000D226271', '起始站位置': '01', '终点站位置': '12'}, {'车次': 'G590', '始发站': 'HGH', '终点站': 'WHN', '出发时间': '09:18', '抵达时间': '13:56', '经历时间': '04:38', '商务座': '无', '一等座': '2', '二等座': '有', '高级软卧': '', '软卧': '', '动卧': '', '硬卧': '', '软座': '', '硬座': '', '无座': '', '其他': '', '备注': '预订', '车次id': '5j0000G59031', '起始站位置': '08', '终点站位置': '16'}, {'车次': 'D2246', '始发站': 'HGH', '终点站': 'HKN', '出发时间': '24:00', '抵达时间': '24:00', '经历时间': '99:59', '商务座': '', '一等座': '', '二等座': '', '高级软卧': '', '软卧': '', '动卧': '', '硬卧': '', '软座': '', '硬座': '', '无座': '', '其他': '', '备注': '列车停运', '车次id': '56000D224640', '起始站位置': '01', '终点站位置': '11'}, {'车次': 'D2196', '始发站': 'HGH', '终点站': 'HKN', '出发时间': '24:00', '抵达时间': '24:00', '经历时间': '99:59', '商务座': '', '一等座': '', '二等座': '', '高级软卧': '', '软卧': '', '动卧': '', '硬卧': '', '软座': '', '硬座': '', '无座': '', '其他': '', '备注': '列车停运', '车次id': '5e000D219603', '起始站位置': '04', '终点站位置': '15'}, {'车次': 'D2188', '始发站': 'HZH', '终点站': 'HKN', '出发时间': '15:16', '抵达时间': '20:14', '经历时间': '04:58', '商务座': '', '一等座': '20', '二等座': '有', '高级软卧': '', '软卧': '', '动卧': '', '硬卧': '', '软座': '', '硬座': '', '无座': '无', '其他': '', '备注': '预订', '车次id': '56000D218802', '起始站位置': '01', '终点站位置': '12'}, {'车次': 'K123', '始发站': 'HGH', '终点站': 'WCN', '出发时间': '15:51', '抵达时间': '05:01', '经历时间': '13:10', '商务座': '', '一等座': '', '二等座': '', '高级软卧': '', '软卧': '12', '动卧': '', '硬卧': '有', '软座': '', '硬座': '有', '无座': '无', '其他': '', '备注': '预订', '车次id': '550000K123E3', '起始站位置': '05', '终点站位置': '13'}, {'车次': 'D2192', '始发站': 'HGH', '终点站': 'HKN', '出发时间': '16:16', '抵达时间': '21:05', '经历时间': '04:49', '商务座': '', '一等座': '有', '二等座': '有', '高级软卧': '', '软卧': '', '动卧': '', '硬卧': '', '软座': '', '硬座': '', '无座': '无', '其他': '', '备注': '预订', '车次id': '56000D219220', '起始站位置': '01', '终点站位置': '11'}, {'车次': 'D3397', '始发站': 'HGH', '终点站': 'WHN', '出发时间': '24:00', '抵达时间': '24:00', '经历时间': '99:59', '商务座': '', '一等座': '', '二等座': '', '高级软卧': '', '软卧': '', '动卧': '', '硬卧': '', '软座': '', '硬座': '', '无座': '', '其他': '', '备注': '列车停运', '车次id': '56000D339702', '起始站位置': '01', '终点站位置': '17'}, {'车次': 'G582', '始发站': 'HGH', '终点站': 'WHN', '出发时间': '16:44', '抵达时间': '21:33', '经历时间': '04:49', '商务座': '10', '一等座': '有', '二等座': '有', '高级软卧': '', '软卧': '', '动卧': '', '硬卧': '', '软座': '', '硬座': '', '无座': '', '其他': '', '备注': '预订', '车次id': '5e0000G58270', '起始站位置': '04', '终点站位置': '15'}, {'车次': 'K253', '始发站': 'HGH', '终点站': 'HKN', '出发时间': '24:00', '抵达时间': '24:00', '经历时间': '99:59', '商务座': '', '一等座': '', '二等座': '', '高级软卧': '', '软卧': '', '动卧': '', '硬卧': '', '软座': '', '硬座': '', '无座': '', '其他': '', '备注': '列车停运', '车次id': '550000K253D1', '起始站位置': '05', '终点站位置': '14'}, {'车次': 'K351', '始发站': 'HGH', '终点站': 'WCN', '出发时间': '18:20', '抵达时间': '08:03', '经历时间': '13:43', '商务座': '', '一等座': '', '二等座': '', '高级软卧': '', '软卧': '8', '动卧': '', '硬卧': '有', '软座': '', '硬座': '有', '无座': '无', '其他': '', '备注': '预订', '车次id': '550000K351D0', '起始站位置': '06', '终点站位置': '16'}, {'车次': 'K1127', '始发站': 'HZH', '终点站': 'WCN', '出发时间': '20:31', '抵达时间': '07:31', '经历时间': '11:00', '商务座': '', '一等座': '', '二等座': '', '高级软卧': '', '软卧': '9', '动卧': '', '硬卧': '有', '软座': '', '硬座': '有', '无座': '无', '其他': '', '备注': '预订', '车次id': '55000K112761', '起始站位置': '05', '终点站位置': '12'}, {'车次': 'Z257', '始发站': 'HGH', '终点站': 'WCN', '出发时间': '21:01', '抵达时间': '04:37', '经历时间': '07:36', '商务座': '', '一等座': '', '二等座': '', '高级软卧': '', '软卧': '无', '动卧': '', '硬卧': '无', '软座': '', '硬座': '', '无座': '', '其他': '', '备注': '预订', '车次id': '550000Z25720', '起始站位置': '03', '终点站位置': '06'}, {'车次': 'Z47', '始发站': 'HZH', '终点站': 'WCN', '出发时间': '24:00', '抵达时间': '24:00', '经历时间': '99:59', '商务座': '', '一等座': '', '二等座': '', '高级软卧': '', '软卧': '', '动卧': '', '硬卧': '', '软座': '', '硬座': '', '无座': '', '其他': '', '备注': '列车停运', '车次id': '5600000Z4701', '起始站位置': '01', '终点站位置': '06'}]

url = 'https://kyfw.12306.cn/otn/leftTicket/query'

train_date = '2020-05-18'
from_station = '杭州东'
to_station = '武汉'

params = {
    'leftTicketDTO.train_date': train_date,  # 查询时间 格式为2020-05-08
    'leftTicketDTO.from_station': from_station,  # 起始站 需要转换为对应的大写字母
    'leftTicketDTO.to_station': to_station,  # 终点站 需要转换为对应的大写字母
    'purpose_codes': 'ADULT',  # 普通票 AUDIT  学生票 0X00
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36',
    # 'Referer': 'https://kyfw.12306.cn/otn/leftTicket/init?linktypeid=dc&fs=%E6%9D%AD%E5%B7%9E,HZH&ts=%E5%B9%B3%E9%98%B3,ARH&date=2020-05-08&flag=N,N,Y',
    # 'Host': 'kyfw.12306.cn',
    'Cookie': 'JSESSIONID=1F9282EB75695237A80D254ACC916F27; _jc_save_wfdc_flag=dc; _jc_save_fromStation=%u676D%u5DDE%u4E1C%2CHGH; _jc_save_toStation=%u6B66%u6C49%2CWHN; RAIL_EXPIRATION=1589719066181; RAIL_DEVICEID=rORUorua24aPA-a23zpdIhjC_q7-Y3oC98Fbflf94Xu1TwuAkwvnNIugBGjEh5927ZZJ0PzRPzqCJMjB0K8VaoKgalFSNvnfju7rgO3osm02igxOBnioGRelBNPnRRcWEpmwndQprX5OfUrRL6cO0se3jNwBajnj; BIGipServerpool_passport=183304714.50215.0000; route=9036359bb8a8a461c164a04f8f50b252; _jc_save_toDate=2020-05-14; _jc_save_fromDate=2020-05-18; BIGipServerotn=602407178.50210.0000'
}

# 获取车次信息


def getTrain(mock = False):
    if mock:
        return mockdata
    params['leftTicketDTO.from_station'] = station_name_dict[from_station]
    params['leftTicketDTO.to_station'] = station_name_dict[to_station]

    res = requests.get(url=url, headers=headers, params=params)
    # print(params, url, res.json())
    train_data = res.json()['data']['result']
    # 结果数据
    result_data = []

    for i, train_data_item in enumerate(train_data):
        train_data_list = train_data_item.split('|')
        # 列车信息
        train_data_dict = {}
        train_data_dict['车次id'] = train_data_list[2]  # 车次编号 查车票价格时用到
        train_data_dict['起始站位置'] = train_data_list[16]  # 起始站位置在16号位置
        train_data_dict['终点站位置'] = train_data_list[17]  # 终点站位置在17号位置
        train_data_dict['车次'] = train_data_list[3]  # 车次在3号位置
        train_data_dict['始发站'] = train_data_list[6]  # 始发站信息在6号位置
        train_data_dict['终点站'] = train_data_list[7]  # 终点站信息在7号位置
        train_data_dict['出发时间'] = train_data_list[8]  # 出发时间信息在8号位置
        train_data_dict['抵达时间'] = train_data_list[9]  # 抵达时间在9号位置
        train_data_dict['经历时间'] = train_data_list[10]  # 经历时间在10号位置
        # 特别注意：商务座在32或25位置
        train_data_dict['商务座'] = train_data_list[32] or train_data_list[25]
        train_data_dict['一等座'] = train_data_list[31]  # 一等座信息在31号位置
        train_data_dict['二等座'] = train_data_list[30]  # 二等座信息在30号位置
        train_data_dict['高级软卧'] = train_data_list[21]  # 高级软卧信息在31号位置
        train_data_dict['软卧'] = train_data_list[23]  # 软卧信息在23号位置
        train_data_dict['动卧'] = train_data_list[27]  # 动卧信息在27号位置
        train_data_dict['硬卧'] = train_data_list[28]  # 硬卧信息在28号位置
        train_data_dict['软座'] = train_data_list[24]  # 软座信息在24号位置
        train_data_dict['硬座'] = train_data_list[29]  # 硬座信息在29号位置
        train_data_dict['无座'] = train_data_list[26]  # 无座信息在26号位置
        train_data_dict['其他'] = train_data_list[22]  # 其他信息在22号位置
        train_data_dict['备注'] = train_data_list[1]  # 备注在1号位置

        result_data.append(train_data_dict)
    return result_data

# 筛选有余票的车次


def getRemainTicketTrain(seat_types, train_data):
    result_data = []
    for i, train in enumerate(train_data):
        # 判断所需要的座位类型有没有余票
        for i2, seat_type in enumerate(seat_types):
            ticket_num = train[seat_type]
            # 如果是 有 或者 余票数
            if ticket_num == '有' or ticket_num.isdigit():
                print(i, i2, train['车次id'])
                ticket_info = getTicketPrice(train['车次id'], train['起始站位置'], train['终点站位置'])
                train['ticket_info'] ={
                    '二等座': ticket_info['O'],
                    '一等座': ticket_info['M'],
                    '无座': ticket_info['WZ']
                } 
                result_data.append(train)
                break
    return result_data

# html 页面制作


def getHtml(seat_type, data):
    # 制作表头
    table_header_content = ''
    for i, v in enumerate(seat_type):
        table_header_content += """
            <div style = "width: 100px " >{value} - 价格</div>
        """.format(value=v)

    table_header = """
        <div style = "display: flex; padding: 8px ">
            <div style = "width: 100px " >车次</div>
            <div style = "width: 250px " >时间</div>
            <div style = "width: 100px " >历时</div>
            {table_header_content}
        </div>
    """.format(table_header_content=table_header_content)

    table_body = ''
    # mockdata 需要改为 data
    for i, v in enumerate(data):
        table_body_content = ''
        for i2, v2 in enumerate(seat_type):
            table_body_content += """
                <div style = "width: 100px " >{value} - {price}</div>
            """.format(value=v[v2],price=v['ticket_info'][v2])

        table_body += """
            <div style = "display: flex; padding: 8px">
                <div style = "width: 100px " >{车次}</div>
                <div style = "width: 250px " >{出发时间} - {抵达时间}</div>
                <div style = "width: 100px " >{经历时间}</div>
                {table_body_content}
            </div>
        """ .format(车次=v['车次'], 出发时间=v['出发时间'], 抵达时间=v['抵达时间'], 经历时间=v['经历时间'], table_body_content=table_body_content)

    html_content = """
        <div>
            <span style="font-size: 16px; padding-right:16px'">
                {from_station} - {to_station}
            </span>
            <a target="_blank" href='https://kyfw.12306.cn/otn/leftTicket/init?linktypeid=dc&fs={from_station},{from_station_code}&ts={to_station},{to_station_code}&date={train_date}&flag=N,N,Y' >购票链接</a>
        </div>
        <div>
            {table_header}
            {table_body}
        </div>
    """.format(
        table_body=table_body,
        table_header=table_header,
        from_station=from_station,
        from_station_code=station_name_dict[from_station],
        to_station=to_station,
        to_station_code=station_name_dict[to_station],
        train_date=train_date
    )

    # print(html_content)
    return html_content

# 获取票价
def getTicketPrice(train_no, station_start, station_end):
    url = 'https://kyfw.12306.cn/otn/leftTicket/queryTicketPrice'
    params = {
        'train_no': train_no,
        'from_station_no': station_start,
        'to_station_no': station_end,
        'seat_types': 'OMO',
        'train_date': train_date,
    }
    res = requests.get(url=url, headers=headers, params = params)
    return res.json()['data']

def main():
    train_info = getTrain(mock=False)
    # train_info = mockdata
    seat_type = ['二等座', '一等座','无座']
    result = getRemainTicketTrain(seat_type, train_data=train_info)
    if len(result) > 0:
        html_content = getHtml(seat_type, result)
        sendmail(
            {
                'content': html_content, 
                'contentType': 'HTML', 
                'subject': "{from_station} - {to_station}  {train_date}".format(
                    train_date=train_date,from_station=from_station,to_station=to_station
                )
            }
        )



if __name__ == "__main__":
    # result = getTrain()
    # print(result)
    main()
    # getTicketPrice()
