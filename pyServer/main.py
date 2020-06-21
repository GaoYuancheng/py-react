from flask import Flask, request
from flask_cors import CORS
# import json
import service.zhihu as zhihu
import service.toutiao as toutiao
import service.upload as upload

app = Flask(__name__)
# 允许跨域s
CORS(app, resources=r'/*')
# 只接受get方法访问
@app.route("/zhihuHot", methods=["GET"])
def getZhihuHot():
    # return interface.test()
    return zhihu.getZhiHuHot()


@app.route("/toutiaoIndex", methods=["POST"])
def getToutiaoIndex():
    # return interface.test()
    return toutiao.getData()


@app.route("/upload", methods=["POST"])
def postUpload():
    return upload.getFile()

# if __name__ == "__main__":
#     app.run(host='127.0.0.1', port='5000', debug=False)
