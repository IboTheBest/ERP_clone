

import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, PhoneFilled } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import getRequest from '../../service/getRequest'
import MoreItem from '../../components/MoreItem'
import { deleteUser } from '../../service/delete'
import toast, { Toaster } from 'react-hot-toast'

const TeachersMore = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  const singleData = getRequest(`/teachers/${id}`, true)

  function handleRemoveTeacher() {
    setDeleteLoading(true)
    deleteUser(`/teachers/${id}`, setDeleteLoading, setDeleteModal, navigate, toast)
  }

  return (
    <div className='p-5'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <button className='cursor-pointer' type='button' onClick={() => navigate(-1)}> <ArrowLeftOutlined className='text-[25px]' /> </button>
          <h2 className='font-bold text-[25px]'>{singleData?.name} {singleData.surname} | #{singleData.id}</h2>
        </div>
        <div className='flex items-center gap-[10px]'>
          <Link to={`tel:${singleData.phone}`}>
            <Button className='!bg-green-500' type='primary' size='large'>
              <PhoneFilled className='text-[22px]' />
            </Button>
          </Link>
          <Button onClick={() => setDeleteModal(true)} className='!bg-red-700' type='primary' size='large'> <DeleteOutlined className='text-[22px]' /> </Button>
          <Button onClick={() => navigate(`edit`)} type='primary' size='large' icon={<EditOutlined className='text-[20px]' />}>Tahrirlash</Button>
        </div>
      </div>
      <div className='flex justify-between mt-10'>
        <ul className='p-5 space-y-2 rounded-md border-[2px] border-slate-400 w-[45%]'>
          <MoreItem title={'Stack nomi'} value={singleData.stack} />
          <MoreItem title={'Maqom'} value={singleData.status} />
          <MoreItem title={'Tajribasi'} value={singleData.experience} />
          <MoreItem title={'Email manzil'} value={singleData.email} />
          <MoreItem title={'Oqish manzili'} value={singleData.study} />
        </ul>
        <ul className='p-5 space-y-2 rounded-md border-[2px] border-slate-400 w-[45%]'>
          <MoreItem title={'Yashash manzili'} value={singleData.region} />
          <MoreItem title={'Tuman nomi'} value={singleData.district} />
          <MoreItem title={'Turmush'} value={singleData.isMerried} />
          <MoreItem title={'Jinsi'} value={singleData.gender} />
          <li className='flex flex-col'>
            <span className='text-slate-400 text-[15px]'>Ish joyi</span>
            <div className='flex mt-1 space-x-2'>
              {singleData?.workCompany?.map((item, index) => <Button key={index}>{item}</Button>)}
            </div>
          </li>
        </ul>
      </div>
      <Modal confirmLoading={deleteLoading} open={deleteModal} onCancel={() => setDeleteModal(false)} onOk={handleRemoveTeacher} title="Ustozni o'chirmoqchimisiz"> </Modal>
    </div>
  )
}

export default TeachersMore
