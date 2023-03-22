import React from 'react'
import { Section, SectionGroup, ColumnContainer } from './styled'
import EmployeeForm from './components/EmployeeForm'
import DataChangeForm from './components/DataChangeForm'

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
                </Section>
            </SectionGroup>
        </>
    )
}

export default AdminPage