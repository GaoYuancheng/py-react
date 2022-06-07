# 单线程
import you_get
import os
import time

stime = time.time()

urlList = []


def getMp4(path, urlList):
    cmd_list = []
    for url in urlList:
        cmds = 'you-get -o %s --format=dash-flv %s' % (path, url)
        cmd_list.append(cmds)
    for count, each in enumerate(cmd_list):
        startTime = time.time()
        print("当前正在下载第%s个视频，一共有%s个视频需要下载..." % (count+1, len(cmd_list)))
        os.system(each)
        endtime = time.time()
        useTime = (endtime-startTime)
        print("您所下载的视频一共使用%s秒" % useTime)


def make_page():
    for p in range(100, 118, 1):
        url = "https://www.bilibili.com/video/av51238267?p=%s" % p
        urlList.append(url)


if __name__ == '__main__':
    make_page()
    path = "F:\\数据分析\\OpenCV+TensorFlow入门人工智能图像处理"
    getMp4(path, urlList)
    etime = time.time()
    utime = (etime-stime)/60
    print("您所下载的全部视频一共使用%s分钟" % utime)
