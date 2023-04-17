import { HTTP_METHODS } from '../../../../services'
import { requestExternalApi } from '../../../../services/requestApi'
import { workOrderWithIdUrlExternal } from '../../../../services/workOrderService'

export default async function getWorkOrderById(req, res) {
  const {
    query: { id },
  } = req
  const { data, message, status } = await requestExternalApi({
    method: HTTP_METHODS.GET,
    url: workOrderWithIdUrlExternal(id),
  })
  return res.status(status).json(message ? { message } : data)
}
