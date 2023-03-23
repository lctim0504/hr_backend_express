import React from 'react'
import { Section, SectionGroup, ColumnContainer } from './styled'
import EmployeeForm from './components/Employee'
import DataChangeForm from './components/DeleteUser'
import UpdateManager from './components/UpdateManager'
import UploadSchedule from './components/UploadSchedule'

const AdminPage = () => {
    return (
        <>
            <ColumnContainer></ColumnContainer>

            <SectionGroup>
                <Section>
                    <EmployeeForm />
                </Section>
                <Section>
                    <DataChangeForm />
                </Section>
                <Section>
                    <UpdateManager />
                </Section>
            </SectionGroup>
            <SectionGroup>
                <Section>
                    <UploadSchedule />
                </Section>
                <Section>
                </Section>
                <Section>
                </Section>
            </SectionGroup>
        </>
    )
}

export default AdminPage