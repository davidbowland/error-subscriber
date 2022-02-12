import { SNSEventRecord, SNSMessage } from '../types'

/* Body */

export const getDataFromRecord = (record: SNSEventRecord): Promise<SNSMessage> =>
  new Promise((resolve) => resolve(record.Sns))
