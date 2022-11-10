import RegisterMachineForm from '../../components/machines/register/RegisterMachineForm'
import { createMachineDto } from '../../schemas/machine'
import Form from '../../components/Form'
import Head from 'next/head'
import { createDocumentTitle } from '../../libs/documentTitle'

const dataInitialValue = {
  name: '',
  maker: '',
  model: '',
  function: '',
  code: '',
  location: '',
  specificData: '',
  criticality: '',
  technicalDocumentation: [],
  image: undefined,
}

export default function RegisterMachine() {
  const mutateValues = (values) => {
    const { technicalDocumentation, ...rest } = values
    const body = {
      ...rest,
      technicalDocumentation: JSON.stringify(technicalDocumentation),
    }
    const formData = new FormData()
    const keys = Object.keys(body)
    keys.forEach((key) => {
      formData.set(key, body[key])
    })
    return formData
  }

  return (
    <>
      <Head>
        <title>{createDocumentTitle('Registro de máquinas')}</title>
      </Head>
      <Form
        title='Registro de Máquina'
        dtoValidation={createMachineDto}
        initialValues={dataInitialValue}
        onSubmit={{
          method: 'POST',
          url: '/api/machines/add',
          message: 'Registrar',
          preSubmit: {
            title: 'Registro de la máquina',
            question: '¿Seguro que quiere registrar la máquina?',
            mutateValues,
          },
          duringSubmit: { message: 'La máquina se está registrando...' },
          successSubmit: { message: 'La máquina se registró exitósamente' },
        }}
      >
        <RegisterMachineForm />
      </Form>
    </>
  )
}
