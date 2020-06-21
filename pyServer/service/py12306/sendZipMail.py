from sendEmail import sendmail
import os

if __name__ == "__main__":

    file_url = os.path.join(os.path.abspath(
        os.path.dirname("__file__")), 'py-react.zip')
    file_content = open(file_url, 'rb').read()
    # print(file_url, file_content, end='\n')
    attrList = []
    attrList.append(file_url)
    sendmail({'content': 'zip', 'attrList': attrList})
