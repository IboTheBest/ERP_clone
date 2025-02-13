import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import CrudCaption from "../../../components/CrudCaption"
import { useNavigate, useParams } from 'react-router-dom'
import FilterCustom from '../../../components/FilterCustom'
import { DatePicker, Input } from 'antd'
import dayjs from 'dayjs';
import { Create, Edit } from '../../../service/auth'
import getRequest from '../../../service/getRequest'

const GroupCrud = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { stackId, groupId } = useParams()

  // Edit Group get Reqest 
  const editGroupData = groupId && getRequest(`/groups/${groupId}`, true)

  const navigate = useNavigate()
  const dateFormat = 'YYYY-MM-DD';
  const date = new Date()
  
  const [name, setName] = useState(null)

  const [teacherId, setTeacherId] = useState(null)
  const [mainTeacher, setMainTeacher] = useState(null)
  const [roomId, setRoomId] = useState(null)
  const [room, setRoom] = useState(null)
  const [createdAt, setCreateAt] = useState(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, 0)}-${String(date.getDate()).padStart(2, 0)}`)
  const [supportTeacher, setSupportTeacher] = useState(null)

  function handleAddGroup(e) {
    setIsLoading(true)
    e.preventDefault()
    const data = {stackId, name, room,roomId,mainTeacher, teacherId,createdAt,supportTeacher,status: true}
    if(groupId){
      data.id = groupId
      Edit(data, `/groups/${groupId}`, setIsLoading, navigate, toast)
    }
    else{
      Create(data, "/groups", setIsLoading, navigate, toast)
    }
  }


  // Edit part
  useEffect(() => {
    if(editGroupData){
      setName(editGroupData.name)
      setTeacherId(editGroupData.teacherId)
      setMainTeacher(editGroupData.mainTeacher)
      setRoomId(editGroupData.roomId)
      setRoom(editGroupData.room)
      setSupportTeacher(editGroupData.supportTeacher)
      setCreateAt(editGroupData.createdAt)
    }
  },[editGroupData])
  return (
    <form onSubmit={handleAddGroup} autoComplete='off' className='p-5'>
      <Toaster position="top-center" reverseOrder={false} />
      <CrudCaption id={groupId} isLoading={isLoading} title={`Gurux ${groupId ? "tahrirlash" : "qo'shish"}`} />
      <div className='flex justify-evenly mt-10'>
        <div className='w-[40%] flex flex-col gap-5'>
          <Input value={name} onChange={(e) => setName(e.target.value)} allowClear required size='large' placeholder='Gurux nomini kiriting' />
          <FilterCustom API={`/teachers?stackId=${stackId}`} filterId={teacherId} setFilterId={setTeacherId} setFilterName={setMainTeacher} placeholder={"Ustoz tanlang"} extraClass={'!w-full'} />
          <Input value={supportTeacher} onChange={(e) => setSupportTeacher(e.target.value)} allowClear required size='large' placeholder='Yordamchi ustozning ismi' />
          <FilterCustom API={"/rooms"} filterId={roomId} setFilterId={setRoomId} setFilterName={setRoom} placeholder={"Xona tanlang"} extraClass={'!w-full'} />
          <DatePicker onChange={(a, b) => setCreateAt(b)} className='w-full' size='large' defaultValue={dayjs(createdAt, dateFormat)} />
        </div>
      </div>
    </form>
  )
}

export default GroupCrud