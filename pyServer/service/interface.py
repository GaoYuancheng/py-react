

from flask import Flask, request
import json


def test():
    # 默认返回内容
    return_dict = {'return_code': 'default122',
                   'return_info': '处理成功', 'result': False}
    # 判断入参是否为空
    if request.args is None:
        return_dict['return_code'] = 'None'
        return_dict['return_info'] = '请求参数为空'
        return json.dumps(return_dict, ensure_ascii=False)
    # 获取传入的params参数
    get_data = request.args.to_dict()
    name = get_data.get('name')
    age = get_data.get('age')
    # 对参数进行操作
    return_dict['result'] = tt(name, age)

    return json.dumps(return_dict, ensure_ascii=False)

# 功能函数


def tt(name, age):
    result_str = "%s今年%s岁" % (name, age)
    return result_str
