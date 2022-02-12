import { SMSMessage, SNSMessage } from '@types'

export const smsMessage: SMSMessage = {
  to: '+15551234567',
  contents: 'Hello, world!',
}

export const snsMessage: SNSMessage = {
  Type: 'Notification',
  MessageId: '95df01b4-ee98-5cb9-9903-4c221d41eb5e',
  TopicArn: 'arn:aws:sns:us-east-1:123456789012:ExampleTopic',
  Subject: 'ALARM: "dbowland-error-test" in US East (N. Virginia)',
  Message: 'example message',
  Timestamp: '1970-01-01T00:00:00.000Z',
  SignatureVersion: '1',
  Signature: 'EXAMPLE',
  SigningCertUrl: 'EXAMPLE',
  UnsubscribeUrl: 'EXAMPLE',
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
}

export const record = {
  EventSource: 'aws:sns',
  EventVersion: '1.0',
  EventSubscriptionArn: 'arn:aws:sns:us-east-1:{{{accountId}}}:ExampleTopic',
  Sns: snsMessage,
}

export const event = { Records: [record] }

export const uuid = 'aaaaa-uuuuu-uuuuu-iiiii-ddddd'
