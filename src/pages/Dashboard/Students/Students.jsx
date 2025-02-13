import React from 'react'
import Caption from  '../../../components/Caption'
import { UsergroupAddOutlined } from '@ant-design/icons'
import StudentDash from '../../../components/StudentDash'
import { PATH } from '../../../hooks/path'

const Students = () => {
  return (
    <div className='p-5'>
      <Caption addLink={`${PATH.studentsAdd}`} title={"O'quvchilar"} icon={<UsergroupAddOutlined />} count={10} />
      <StudentDash groupId={null} removeAddBtn={true}/>
    </div>
  )
}

export default Students