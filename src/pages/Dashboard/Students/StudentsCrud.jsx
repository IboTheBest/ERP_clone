import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import CrudCaption from '../../../components/CrudCaption'
import { useParams } from 'react-router-dom'
import FilterCustom from "../../../components/FilterCustom"
import { Input } from 'antd'
const StudentsCrud = () => {
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(false)

    const [studentId, setStudentId] = useState(null)
    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [groupId, setGroupId] = useState(null)
    const [group, setGroup] = useState(null)
    const [stackId, setStackId] = useState(null)


    return (
        <form autoComplete='off' className='p-5'>
            <Toaster position="top-center" reverseOrder={false} />
            <CrudCaption id={id} isLoading={isLoading} title={`O'quvchi ${id ? "tahrirlash" : "qo'shish"}`} />
            <div className='flex justify-evenly mt-10'>
                <div className='w-[40%] flex flex-col gap-3'>
                    <Input value={studentId} onChange={(e) => setStudentId(e.target.value)} allowClear required size='large' placeholder='ID yarating' />
                    <Input value={name} onChange={(e) => setName(e.target.value)} allowClear required size='large' placeholder='Ism kiriting' />
                    <Input value={surname} onChange={(e) => setSurname(e.target.value)} allowClear required size='large' placeholder='Familiya kiriting' />
                    <FilterCustom API={"/stack"} filterId={stackId} setFilterId={setStackId} placeholder={"Yo'nalish tanlang"} extraClass={'!w-full'} />
                    <FilterCustom API={`/groups`} filterId={groupId} setFilterName={setGroup} setFilterId={setGroupId} placeholder={'Gurux tanlang'} extraClass={'!w-full'} />
                </div>
                <div className='w-[40%] flex flex-col gap-3'>
                </div>
            </div>
        </form>
    )
}

export default StudentsCrud