import sys
from you_get import common as you_get  # 导入you-get库

directory = r'E:\javaVideo'  # 设置下载目录
url = 'https://www.bilibili.com/video/BV1Qy4y1k7kL?p=1'  # 需要下载的视频地址
# sys传递参数执行下载，就像在命令行一样；‘-l’是指按列表下载，如果下载单个视频，去掉‘-l’即可；‘-o’后面跟保存目录。
sys.argv = ['you-get', '-l', '-o', directory, url]

if __name__ == "__main__":
    you_get.main()
