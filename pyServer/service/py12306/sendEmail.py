import smtplib
from emailAccount import user_name, password

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from email.header import Header

from_addr = user_name
to_addr = '389152147@qq.com'
# m15009010297@163.com
# gaoyc@hunktimes.com
mailserver = "smtp.qq.com"

# msg = MIMEText('hello, send by Python...', 'plain', 'utf-8')
# msg['From'] = 'py'  # 邮件上显示的发件人
# msg['To'] = 'LG'  # 邮件上显示的收件人
# msg['Subject'] = Header('hasRemainTicket', 'utf-8')  # 邮件主题


# 构造邮件内容
def formatMail(msgDict):
    """ 
        @params msgDict { \n
            'content': str, # 邮件内容
            'conetntType': 'plain' | 'html', # 内容类型 
            'from'?: str, # 邮件上显示的发件人
            'to'?: str, # 邮件上显示的收件人
            'subject'?: str, # 邮件主题
            'attrList'?: list # 附件
        }
    """
    contentType = msgDict.get('contentType', 'plain')
    mailFrom = msgDict.get('from')
    mailTo = msgDict.get('to')
    mailSubject = msgDict.get('subject')
    attrList = msgDict.get('attrList', [])
    msg = MIMEMultipart()
    msg_content = MIMEText(msgDict['content'], contentType, 'utf-8')
    msg.attach(msg_content)
    if mailFrom:
        msg['From'] = mailFrom
    if mailTo:
        msg['To'] = mailTo
    if mailSubject:
        msg['Subject'] = mailSubject
    if len(attrList) > 0:
        for item in attrList:
            file_content = MIMEApplication(
                open(item, 'rb').read())
            file_content.add_header(
                'Content-Disposition', 'attachment', filename="py-react.zip")
            msg.attach(file_content)

    # print(msg)
    return msg


# 发送邮件
def sendmail(msgDict):
    """
        @params msgDict {\n
            'content': str, # 邮件内容
            'contentType': 'plain' | 'html', # 内容类型 
            'from'?: str, # 邮件上显示的发件人
            'to'?: str, # 邮件上显示的收件人
            'subject'?: str, # 邮件主题
            'attrList'?: list # 附件
        }
    """
    msg = formatMail(msgDict)
    server = smtplib.SMTP(mailserver, 25)  # SMTP协议默认端口是25
    server.set_debuglevel(1)
    server.login(user_name, password)
    server.sendmail(from_addr, [to_addr], msg.as_string())
    server.quit()
    print('发送成功')


if __name__ == "__main__":
    print(user_name, password)
    # formatMail({'content': 'sss'})
    sendmail({'content': 'sss'})
