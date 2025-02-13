import React, { useEffect, useState } from 'react'
import CrudCaption from '../../components/CrudCaption'
import { Input, Select } from 'antd'
import FilterCustom from '../../components/FilterCustom'
import { Create, Edit } from '../../service/auth'
import { useNavigate, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import getRequest from '../../service/getRequest'
const TeachersCrud = () => {
  // -------- Update part start
  const {id} = useParams()
  const singleData = id && getRequest(`/teachers/${id}`, true)
  // -------- Update part end

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const [name, setName] = useState(null)
  const [surname, setSurname] = useState(null)
  const [age, setAge] = useState(null)
  const [experience, setExperience] = useState(null)
  const [email, setEmail] = useState(null)
  const [phone, setPhone] = useState("+998")
  const [study, setStudy] = useState(null)

  const [stack, setStack] = useState(null)
  const [stackId, setStackId] = useState(null)
  const [region, setRegion] = useState(null)
  const [regionId, setRegionId] = useState(null)
  const [district, setDistrict] = useState(null)
  const [statusId, setStatusId] = useState(null)
  const [status, setStatus] = useState(null)
  const [gender, setGender] = useState(null)
  const [isMerried, setIsMerried] = useState(null)
  const [workCompanyId, setWorkCompanyId] = useState(null)
  const [workCompany, setWorkCompany] = useState(null)


  function handleAddTeachaer(e) {
    e.preventDefault()
    setIsLoading(true)
    const data = { name, surname, age, stackId, stack, region, regionId, district, status, statusId, experience, gender, email, phone, isMerried, study, workCompany, workCompanyId }
    if(id){
      data.id = id
      Edit(data, `/teachers/${id}`, setIsLoading, navigate, toast)
    }
    else{
      Create(data, "/teachers", setIsLoading, navigate, toast)
    }
  }

  // Update Part 
  useEffect(() => {
   if(singleData){
    setName(singleData?.name)
    setSurname(singleData.surname)
    setAge(singleData.age)
    setExperience(singleData.experience)
    setEmail(singleData.email)
    setPhone(singleData.phone)
    setStudy(singleData.study)
    setStack(singleData.stack)
    setStackId(singleData.stackId)
    setRegion(singleData.region)
    setRegionId(singleData.regionId)
    setDistrict(singleData.district)
    setStatus(singleData.status)
    setStatusId(singleData.statusId)
    setGender(singleData.gender)
    setIsMerried(singleData.isMerried)
    setWorkCompany(singleData.workCompany)
    setWorkCompanyId(singleData.workCompanyId)
   }
  },[singleData])
  return (
    <form onSubmit={handleAddTeachaer} autoComplete='off' className='p-5'>
      <Toaster position="top-center" reverseOrder={false} />
      <CrudCaption id={id} isLoading={isLoading} title={`Ustoz ${id ? "tahrirlash" : "qo'shish"}`} />
      <div className='flex justify-evenly mt-10'>
        <div className='w-[40%] space-y-3'>
          <Input value={name} onChange={(e) => setName(e.target.value)} allowClear required size='large' placeholder='Ism kiriting' />
          <Input value={surname} onChange={(e) => setSurname(e.target.value)} allowClear required size='large' placeholder='Familiya kiriting' />
          <Input value={age} onChange={(e) => setAge(e.target.value)} type='number' allowClear required size='large' placeholder='Yosh kiriting' />
          <Input value={experience} onChange={(e) => setExperience(e.target.value)} allowClear required size='large' placeholder='Tajriba kiriting' />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} allowClear type='email' required size='large' placeholder='Email kiriting' />
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} allowClear type='tel' required size='large' placeholder='Telefon raqam kiriting' />
          <Input value={study} onChange={(e) => setStudy(e.target.value)} allowClear type='tel' required size='large' placeholder="O'qish joyi kiriting" />
        </div>
        <div className='w-[40%] flex flex-col gap-3'>
          <FilterCustom API={"/stack"} filterId={stackId} setFilterId={setStackId} setFilterName={setStack} placeholder={'Stack tanlang'} extraClass={'!w-full'} />
          <FilterCustom API={"/regions"} filterId={regionId} setFilterName={setRegion} setFilterId={setRegionId} placeholder={'Viloyat tanlang'} extraClass={'!w-full'} />
          <Input value={district} onChange={(e) => setDistrict(e.target.value)} allowClear required size='large' placeholder='Tuman kiriting' />
          <FilterCustom API={"/status"} filterId={statusId} setFilterId={setStatusId} setFilterName={setStatus} placeholder={'Lavozim tanlang'} extraClass={'!w-full'} />
          <Select value={gender} onChange={(value) => setGender(value)} allowClear size='large' showSearch placeholder={"Jins tanlang"} optionFilterProp="label" options={[{ label: "Erkak", value: "Erkak" }, { label: "Ayol", value: "Ayol" }]} />
          <Input value={isMerried} onChange={(e) => setIsMerried(e.target.value)} allowClear required size='large' placeholder='Turmush qurganmisiz' />
          <FilterCustom API={"/workList"} filterId={workCompanyId} setFilterId={setWorkCompanyId} setFilterName={setWorkCompany} placeholder={'Ish joyinggizni tanlang'} extraClass={'!w-full'} mode={"multiple"} />
        </div>
      </div>
    </form>
  )
}

export default TeachersCrud