import { SMSMessage, SNSMessage } from '@types'

export const smsMessage: SMSMessage = {
  contents: 'Hello, world!',
  to: '+15551234567',
}

export const snsMessage: SNSMessage = {
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
}

export const record = {
  EventSource: 'aws:sns',
  EventSubscriptionArn: 'arn:aws:sns:us-east-1:{{{accountId}}}:ExampleTopic',
  EventVersion: '1.0',
  Sns: snsMessage,
}

export const event = { Records: [record] }

export const uuid = 'aaaaa-uuuuu-uuuuu-iiiii-ddddd'
