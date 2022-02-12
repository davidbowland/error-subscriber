import { record } from '../__mocks__'
import { getDataFromRecord } from '@utils/message-processing'

describe('message-processing', () => {
  describe('getDataFromRecord', () => {
    test('expect correct output', async () => {
      const result = await getDataFromRecord(record)
      expect(result).toEqual({
        Message: 'example message',
        MessageAttributes: {
          Test: {
            Type: 'String',
            Value: 'TestString',
          },
          TestBinary: {
            Type: 'Binary',
            Value: 'TestBinary',
          },
        },
        MessageId: '95df01b4-ee98-5cb9-9903-4c221d41eb5e',
        Signature: 'EXAMPLE',
        SignatureVersion: '1',
        SigningCertUrl: 'EXAMPLE',
        Subject: 'ALARM: "dbowland-error-test" in US East (N. Virginia)',
        Timestamp: '1970-01-01T00:00:00.000Z',
        TopicArn: 'arn:aws:sns:us-east-1:123456789012:ExampleTopic',
        Type: 'Notification',
        UnsubscribeUrl: 'EXAMPLE',
      })
    })
  })
})
