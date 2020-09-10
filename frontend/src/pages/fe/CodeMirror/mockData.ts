export const mockData = {
  "paths":
  {
     "v2/5185415ba171ea3a00704eed":
     {
        "get":
        {
           "produces":
           [
              "application/json"
           ],
           "responses":
           {
              "200":
              {
                 "description":""
              },
              "default":
              {
                 "description":""
              }

           },
           "summary":"mockkkkk",
           "swaggerUpstreamInfoModel":
           {
              "routerInfo":
              {
                 "apiCount":3,
                 "canDelete":false,
                 "gmtCreate":1583412971000,
                 "gmtModified":1584584249000,
                 "routerConfigModels":
                 [
                    {
                       "argKey":"d",
                       "argValue":"1",
                       "id":50,
                       "matchType":"IN",
                       "routerType":"HEADER",
                       "sysId":"vmQquAys6LY1hvruQxt0xjOVrzH9hwXo",
                       "systemCluster":
                       {
                          "authenticationType":"SECRET",
                          "canDelete":true,
                          "description":"11111",
                          "gmtCreate":1583406900000,
                          "gmtModified":1584351434000,
                          "host":
                          [
                             "http:86",
                             "http:87",
                             "http:88",
                             "http:89"
                          ],
                          "lbType":"RAMDOM",
                          "sysId":"vmQquAys6LY1hvruQxt0xjOVrzH9hwXo",
                          "sysName":"test",
                          "sysType":"URL",
                          "tenantId":"tenantId",
                          "upstreamProtocol":"HTTP",
                          "workspaceId":"workspaceId"
                       }

                    },
                    {
                       "argKey":"d",
                       "argValue":"2",
                       "id":51,
                       "matchType":"IN",
                       "routerType":"HEADER",
                       "sysId":"2slrRhBgFVpbIO5iuUwl2XemvuT50kQF",
                       "systemCluster":
                       {
                          "canDelete":true,
                          "gmtCreate":1583926401000,
                          "gmtModified":1583926401000,
                          "host":
                          [
                             "192.1.1.1:80"
                          ],
                          "sysId":"2slrRhBgFVpbIO5iuUwl2XemvuT50kQF",
                          "sysName":"testhttp",
                          "sysType":"URL",
                          "tenantId":"tenantId",
                          "upstreamProtocol":"HTTP",
                          "workspaceId":"workspaceId"
                       }

                    }

                 ],
                 "routerId":"So1nnpjSYvX2Rfyt",
                 "routerName":"router-test",
                 "routerType":"HEADER",
                 "tenantId":"tenantId",
                 "upstreamProtocol":"HTTP",
                 "workspaceId":"workspaceId"
              },
              "routerType":"HEADER",
              "timeout":3000,
              "upstreamPath":"/v2/5185415ba171ea3a00704eed",
              "upstreamProtocol":"HTTP",
              "upstreamType":"SYSTEM_CLUSTER"
           }

        }

     },
     "/getUserName":
     {
        "get":
        {
           "appType":"STANDARD",
           "parameters":
           [
              {
                 "default":"test",
                 "description":"",
                 "in":"query",
                 "name":"name",
                 "required":false,
                 "type":"string"
              }

           ],
           "produces":
           [
              "application/json"
           ],
           "responses":
           {
              "200":
              {
                 "description":{
                    "success": true
                 }

              },
              "default":
              {
                 "schema":
                 {
                    "type":"object",
                    "properties":
                    {
                       "errorDesc":
                       {
                          "description":"",
                          "type":"string"
                       },
                       "errorCode":
                       {
                          "description":"200001",
                          "type":"string"
                       },
                       "errorMsg":
                       {
                          "description":"无响应",
                          "type":"string"
                       }

                    }

                 },
                 "description":{
                    "success": false
                 }

              }

           },
           "summary":"http-test-api1",
           "swaggerUpstreamInfoModel":
           {
              "timeout":3000,
              "upstreamType":"MOCK"
           }

        }

     }

  },
  "schemes":
  [
     "https"
  ],
  "swagger":"2.0",
  "info":
  {
     "description":"A simple API to learn how to write OpenAPI Specification",
     "title":"Simple API",
     "version":"1.0.0"
  }

}
