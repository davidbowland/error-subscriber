import axios, { AxiosResponse } from 'axios'

import { smsApiKeyName, smsApiUrl, smsToPhoneNumber } from '../config'
import { getApiKey } from '../services/api-keys'
import { SMSMessage, SNSMessage } from '../types'

const api = axios.create({
  baseURL: smsApiUrl,
})

/* Emails */

const convertContentsToJson = (message: SNSMessage): SMSMessage => ({
  to: smsToPhoneNumber,
  contents: message.Subject,
  messageType: 'TRANSACTIONAL',
})

export const sendSms = (message: SNSMessage): Promise<AxiosResponse> =>
  Promise.resolve(convertContentsToJson(message)).then(exports.sendRawSms)

export const sendRawSms = (body: SMSMessage): Promise<AxiosResponse> =>
  getApiKey(smsApiKeyName).then((queueApiKey) =>
    api.post('/messages', body, {
      headers: {
        'x-api-key': queueApiKey,
      },
    })
  )
