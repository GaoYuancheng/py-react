
# 多线程
import you_get
import os
import time
import threading

stime = time.time()

urlList = []
cmd_list = []


def getMp4(path, urlList):
    for url in urlList:
        cmds = 'you-get -o %s --format=dash-flv %s' % (path, url)
        cmd_list.append(cmds)


def download(count, each):
    startTime = time.time()
    print("当前正在下载第%s个视频，一共有%s个视频需要下载..." % (count+1, len(cmd_list)))
    print(each)
    os.system(each)
    endtime = time.time()
    useTime = (endtime-startTime)
    print("您所下载的视频一共使用%s秒" % useTime)


def make_page():
    for p in range(1, 9, 1):
        url = "https://www.bilibili.com/video/av84328746?p=%s" % p
        urlList.append(url)


def main():
    for count, each in enumerate(cmd_list):
        thr1 = threading.Thread(target=download, args=(count, each))
        thr1.start()
        thr1.join()
#         thr2 = threading.Thread(target=download, args=(count,each))
#         thr2.start()
#         thr2.join()


if __name__ == '__main__':
    make_page()
    path = "F:\数据分析\深度学习在图像处理中的应用"
    getMp4(path, urlList)
    main()
    etime = time.time()
    utime = (etime-stime)
    print("您所下载的全部视频一共使用%s分钟" % utime)
