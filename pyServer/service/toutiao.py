# 头条指数
import requests

from flask import Flask, request
import json
import xlwt
import datetime
import time
import xlrd

import utils.api_config as api_config

url = 'https://index.toutiao.com/api/keyword/trends'
params = {
    'region': 0,
    'category': 0,
    'keywords': ['美国', '中国'],
    'start': 20200401,
    'end': 20200419,
    'is_hourly': 0,
}

# 获取时间


def get_time(time):
    return datetime.datetime(int(time[0:4]), int(time[4:6]), int(time[6:8]))

# 写入表格


def writeExcel(args, data):
    """
        @args params:{ }
    """
    keywords = args.get('keywords')
    start = str(args.get('start'))
    end = str(args.get('end'))

    real_data = data

    # 创建一个workbook 设置编码
    workbook = xlwt.Workbook(encoding='utf-8')

    # 创建一个worksheet
    worksheet = workbook.add_sheet('头条指数统计')

    # 写入时间列
    dt1 = get_time(start)
    dt2 = get_time(end)
    # 需要算上最后一天
    time_range = (dt2 - dt1).days + 1

    for index in range(time_range):
        worksheet.write(
            index + 1, 0, (dt1+datetime.timedelta(days=index)).strftime("%Y-%m-%d"))

    # 写入第一行
    for index in range(len(keywords)):
        keyword_title = keywords[index]
        trends = real_data.get(keyword_title).get('trends', {})
        trends_range = real_data.get(keyword_title).get('trends_range', {})

        # 写入title 行 列 值
        worksheet.write(0, index + 1, label=keyword_title)

        # 写入数据
        data_list = trends.get(keyword_title, [])
        for innerIndex in range(len(data_list)):

            # 写入数据
            worksheet.write(innerIndex + 1, index + 1,
                            label=data_list[innerIndex])

    # 保存
    workbook.save('test.xls')


# 从页面接口获取 toutiao.index
def getData_from_toutiao(args):
    return_data = {}
    keywords = args.get('keywords', [])
    for item in keywords:
        params = args.copy()
        del params['keywords']
        params.setdefault('keyword', item)
        res = requests.get(url=url, params=params)
        # print(args)
        res.encoding = 'utf-8'
        print(item, res.status_code)
        if len(res.history) > 0 or res.status_code != 200:
            return_data.setdefault(item, {})
        else:
            return_data.setdefault(item, res.json())
        time.sleep(10)

        # writeExcel(args, return_data)
    return return_data


# 从excel文件中读取
def getData_from_excel(args):

    keywords = args.get('keywords', [])
    start = str(args.get('start'))
    end = str(args.get('end'))

    country = xlrd.open_workbook("country.xls")
    # print("获取book中所有工作表的名称:")
    table = country.sheet_by_name('头条指数统计')
    # print(table.row_values(0))
    title_row = table.row_values(0)
    time_col = table.col_values(0)
    return_list = []

    id = 1
    for keyword in keywords:
        # 获取所在列的index
        row_index = title_row.index(keyword)
        # print(row_index, keyword)
        for time in time_col:
            # 去除第一列time = 0 的情况
            if time:
                # 表格中的时间
                dt1 = datetime.datetime.strptime(time, '%Y-%m-%d')
                # 传入的时间
                dt2_start = get_time(start)
                dt2_end = get_time(end)
                if dt2_start <= dt1 <= dt2_end:
                    id = id + 1
                    # print('sss', id, time_col.index(time))
                    col_index = time_col.index(time)
                    return_dict = {
                        'name': keyword,
                        'type': keyword,
                        'date': time,
                        'value': str(int(table.cell_value(col_index, row_index)))
                    }
                    return_list.append(return_dict)
                # print(dt1)
    return_data = {'data': return_list}
    # print(return_data)

    return return_data


def getData():
    args = request.json
    getType = args.get('getType', 'read')
    return_data = {}
    if getType == 'read':
        return_data = getData_from_excel(args)
    elif getType == 'get':
        return_data = getData_from_toutiao(args)

    return api_config.default_return(return_data, True)


if __name__ == "__main__":
    getData_from_excel({'keywords': ['美国', '日本'],  'start': 20200401,
                        'end': 20200419, })
#     # getData()
#     writeExcel(params)
