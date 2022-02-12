import { mocked } from 'jest-mock'

import { record } from '../__mocks__'
import eventJson from '@events/event-sns.json'
import { snsPayloadProcessorHandler } from '@handlers/sns-payload-processor'
import * as queue from '@services/queue'
import { SNSEvent } from '@types'
import * as logging from '@utils/logging'
import * as messageProcessing from '@utils/message-processing'

jest.mock('@services/queue')
jest.mock('@utils/logging')
jest.mock('@utils/message-processing')

describe('sns-payload-processor', () => {
  beforeAll(() => {
    mocked(logging).log.mockReturnValue(undefined)
    mocked(messageProcessing).getDataFromRecord.mockResolvedValue(record)
  })

  describe('snsPayloadProcessorHandler', () => {
    const event = eventJson as undefined as SNSEvent
    beforeAll(() => {
      mocked(queue).sendSms.mockResolvedValue(undefined)
    })

    test('expect sendSms to be called for each record', async () => {
      await snsPayloadProcessorHandler(event, undefined, undefined)
      expect(mocked(queue).sendSms).toHaveBeenCalledWith(record)
    })

    test('expect snsPayloadProcessorHandler to not fail when sendSms fails', async () => {
      mocked(queue).sendSms.mockRejectedValueOnce('fnord')
      await snsPayloadProcessorHandler(event, undefined, undefined)
      expect(mocked(logging).logError).toHaveBeenCalledWith('fnord')
    })
  })
})
