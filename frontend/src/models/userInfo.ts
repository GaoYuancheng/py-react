import { useState, useCallback } from 'react'

interface UserInfo {
  username? : string
}

export default function useAuthModel() {
  const [userInfo, setUserInfo] = useState<UserInfo>({username: '未登录'})

  return {
    userInfo,
    setUserInfo,
  }
}