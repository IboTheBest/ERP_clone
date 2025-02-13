import React from 'react'
import { instance } from "../hooks/instance"
import { useEffect} from "react"
import { LineOutlined, MoreOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useNavigate } from 'react-router-dom'
 
export const getGroups = (stackId, refresh, setGroups, teacherId) => {
  const navigate = useNavigate()
    useEffect(() => {
        instance().get(`/groups?stackId=${stackId}`, {
          params:{teacherId}
        }).then(res => {
          setGroups(res.data.map((item, index) => {
            item.key = index + 1
            item.name = item.name ? item.name : <LineOutlined />
            item.status = item.status ? "Active" : "Active emas"
            item.action = <Button onClick={() => navigate(`${item.id}`)} className='!w-[32px] !h-[32px]' size='middle' type='primary'><MoreOutlined className='rotate-90' /></Button>
            return item
          }))
        })
    }, [refresh, teacherId])
}