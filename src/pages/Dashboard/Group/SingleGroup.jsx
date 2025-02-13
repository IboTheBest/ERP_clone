import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import getRequest from '../../../service/getRequest'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Modal } from 'antd'
import { instance } from '../../../hooks/instance'
import { deleteUser } from '../../../service/delete'
import StudentDash from '../../../components/StudentDash'

const SingleGroup = () => {
  const {groupId} = useParams()
  const navigate = useNavigate()
  
  // Update
  const singleData = getRequest(`/groups/${groupId}`)

  // Delete 
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  function handleRemoveGroup(){
    setDeleteLoading(true)

    instance().get(`/students?groupId=${groupId}`).then(res => {
      if(res.data.length){
        setTimeout(() => {
          toast.error("Bu guruxda o'quvchi mavjud , o'chirish taqiqlangan!")
          setDeleteLoading(false)
          setDeleteModal(false)
        },1000)
      }
      else{
        deleteUser(`/groups/${groupId}`, setDeleteLoading, setDeleteModal, navigate, toast)
      }
    })
  }
  // Delete

  return (
    <div className='p-5'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <button className='cursor-pointer' type='button' onClick={() => navigate(-1)}> <ArrowLeftOutlined className='text-[25px]' /> </button>
          <h2 className='font-bold text-[25px]'>{singleData?.name} | {singleData.mainTeacher}</h2>
        </div>
        <div className='flex items-center gap-[10px]'>
          <Button onClick={() => setDeleteModal(true)} className='!bg-red-700' type='primary' size='large'> <DeleteOutlined className='text-[22px]' /> </Button>
          <Button onClick={() => navigate(`edit`)} type='primary' size='large' icon={<EditOutlined className='text-[20px]' />}>Gurux tahrirlash</Button>
        </div>
      </div>
      <StudentDash groupId={groupId}/>
      <Modal confirmLoading={deleteLoading} open={deleteModal} onCancel={() => setDeleteModal(false)} onOk={handleRemoveGroup} title="Guruxni o'chirmoqchimisiz"> </Modal>
    </div>
  )
}

export default SingleGroup