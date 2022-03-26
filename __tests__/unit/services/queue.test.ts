import { mocked } from 'jest-mock'

import * as apiKeys from '@services/api-keys'
import { rest, server } from '@setup-server'
import { smsApiKeyName, smsApiUrl, smsToPhoneNumber } from '@config'
import { sendSms } from '@services/queue'
import { snsMessage } from '../__mocks__'

jest.mock('@services/api-keys')

describe('queue', () => {
  describe('sendSms', () => {
    const postEndpoint = jest.fn().mockReturnValue(200)
    const queueApiKey = '23efvb67yujkm'

    beforeAll(() => {
      server.use(
        rest.post(`${smsApiUrl}/messages`, async (req, res, ctx) => {
          if (queueApiKey != req.headers.get('x-api-key')) {
            return res(ctx.status(403))
          }

          const body = postEndpoint(req.body)
          return res(body ? ctx.json(body) : ctx.status(400))
        })
      )
      mocked(apiKeys).getApiKey.mockResolvedValue(queueApiKey)
    })

    test('expect API key fetched', async () => {
      await sendSms(snsMessage)
      expect(mocked(apiKeys).getApiKey).toHaveBeenCalledWith(smsApiKeyName)
    })

    test('expect sms contents to be passed to the endpoint', async () => {
      await sendSms(snsMessage)
      expect(postEndpoint).toHaveBeenCalledWith({
        contents: 'ALARM: "dbowland-error-test" in US East (N. Virginia)',
        messageType: 'TRANSACTIONAL',
        to: smsToPhoneNumber,
      })
    })
  })
})
