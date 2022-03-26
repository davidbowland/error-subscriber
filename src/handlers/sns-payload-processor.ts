import { SNSEvent, SNSEventRecord, SNSHandler } from '../types'
import { log, logError } from '../utils/logging'
import { getDataFromRecord } from '../utils/message-processing'
import { sendSms } from '../services/queue'

/* Queue processing */

export const processSingleMessage = async (record: SNSEventRecord): Promise<void> => {
  const data = await getDataFromRecord(record)
  await sendSms(data)
}

export const snsPayloadProcessorHandler: SNSHandler = async (event: SNSEvent): Promise<void> => {
  log('Received payload', event)
  for (const record of event.Records) {
    try {
      await exports.processSingleMessage(record)
    } catch (error) {
      logError(error)
    }
  }
}
