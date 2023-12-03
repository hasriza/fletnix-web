/**
 *
 * Auth
 *
 */
import { Button, Card, DatePicker, Form, Input, Tabs } from 'antd';
import dayjs from 'dayjs';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from './slice/selectors';

interface Props {}

export function Auth(props: Props) {
  const { actions } = useAuthSlice();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { loading } = useSelector(selectAuth);

  const [activeTab, setActiveTab] = React.useState<string>('register');

  const onFinish = (values: any) => {
    const modDateValues = { ...values, dob: values?.dob?.toISOString() };
    const { confirm, ...finalValues } = modDateValues;

    dispatch(
      activeTab === 'register'
        ? actions.registrationStart(finalValues)
        : actions.loginStart(finalValues),
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        title={activeTab === 'register' ? 'Join FletNix!' : 'Free search!'}
        headStyle={{ textAlign: 'center', fontSize: '1.4rem' }}
        bodyStyle={{ padding: '0 1rem 1rem 1rem' }}
      >
        <Tabs
          defaultActiveKey={activeTab}
          centered
          onChange={val => setActiveTab(val)}
          items={[
            {
              label: 'Register',
              key: 'register',
            },
            { label: 'Login', key: 'login' },
          ]}
        />
        <Form
          form={form}
          name="auth-user"
          layout="vertical"
          onFinish={onFinish}
          className="formClass"
        >
          {activeTab === 'register' && (
            <Form.Item
              name="name"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          )}

          {activeTab === 'register' && (
            <Form.Item
              name="dob"
              rules={[
                {
                  required: true,
                  message: 'Please input your date of birth!',
                },
              ]}
              initialValue={dayjs().subtract(5, 'years')}
            >
              <DatePicker
                allowClear={false}
                format={'DD-MM-YYYY'}
                disabledDate={d =>
                  !d ||
                  d < dayjs().subtract(150, 'years') ||
                  d > dayjs().subtract(5, 'years')
                }
                placeholder="Date of Birth"
                style={{ width: '100%' }}
                showToday={false}
              />
            </Form.Item>
          )}

          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          {activeTab === 'register' && (
            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The new password that you entered do not match!',
                      ),
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm password" />
            </Form.Item>
          )}

          <Form.Item style={{ textAlign: 'center', padding: 0, margin: 0 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              {activeTab === 'register' ? 'Register' : 'Login'}
            </Button>
          </Form.Item>
          <div
            style={{ textAlign: 'center', width: '100%', marginTop: '12px' }}
          >
            <Button type="link" onClick={() => navigate('/')}>
              Home Page
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
