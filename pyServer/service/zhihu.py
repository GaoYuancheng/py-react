# 知乎热榜
import requests
import bs4
import json

from utils.api_config import default_return


def getZhiHuHot():
    url = 'https://www.zhihu.com/hot'
    headers = {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36',
        'cookie': '_zap=72179d1e-d85b-4c48-8bb0-0fb9b74a71ad; d_c0="AOAg4tV-aBCPTo4tXJWfTdjp_p_JETP3vtc=|1574670477"; z_c0="2|1:0|10:1579228819|4:z_c0|92:Mi4xNGp4TEJBQUFBQUFBNENEaTFYNW9FQ1lBQUFCZ0FsVk5rMndPWHdCM3oxeWZKVTdFUmppRV9EYUZrTVl2VHVmcUh3|49337e58e8058d744ee354616259c1949654d8c01b4369078fae62fdac1fc829"; _xsrf=57O8lDJpvbZpKiAaFN93Ren034xuQ68r; _ga=GA1.2.1724133855.1587459183; q_c1=1cd4262788cc4b8d985f848f09c18d42|1587459182000|1579400857000; _gid=GA1.2.197407565.1587612750; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1587612749,1587612820,1587612889; tshl=; tst=h; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1587622365; _gat_gtag_UA_149949619_1=1; SESSIONID=8bqvPl4XLAASxabh3pkkABZIyEork9jtcOSRxAjJtXh; JOID=WlwXBkMGAsaQchZLJwu-nbsmZW48Mmaw6yJ2eXhKT4HEB3clSdIybcN-HEotrfknNGZGCFNxhwQCrdZwBYaWNgA=; osd=W1ESCkkHD8OceBdGIge0nLYjaWQ9P2O84SN7fHRATozBC30kRNc-Z8JzGUYnrPQiOGxHBVZ9jQUPqNp6BIuTOgo=; KLBRSID=e42bab774ac0012482937540873c03cf|1587622373|1587621646'
    }

    res = requests.get(url=url, headers=headers)
    html = res.text
    soup = bs4.BeautifulSoup(html, "html.parser")
    contents = soup.find_all("div", class_='HotItem-content')
    hot_list = []
    id = 1
    for hot_item in contents:
        tag = hot_item.find('a')
        hot_list_item = {
            'href': tag.get('href'),
            'title': tag.get('title'),
            'id': id,
        }
        id += 1
        hot_list.append(hot_list_item)

    return default_return(hot_list, True)


if __name__ == "__main__":
    res = getZhiHuHot()
    print(res)
