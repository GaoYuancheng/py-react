
import json


def default_return(data, status):
    return_dict = {
        'data': data,
        'success': status
    }
    return json.dumps(return_dict)
