import axios, { AxiosResponse } from 'axios'

import { SMSMessage, SNSMessage } from '../types'
import { smsApiKeyName, smsApiUrl, smsToPhoneNumber } from '../config'
import { getApiKey } from '../services/api-keys'

const api = axios.create({
  baseURL: smsApiUrl,
})

/* Emails */

const convertContentsToJson = (message: SNSMessage): SMSMessage => ({
  contents: message.Subject,
  messageType: 'TRANSACTIONAL',
  to: smsToPhoneNumber,
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
