/* eslint-disable no-console */
import { ElButton, ElForm, ElInput, ElInputNumber, FormRules, isEmpty, useForm } from '@qsxy/element-plus-react';
import React, { useCallback, useMemo } from 'react';

const App = () => {
    const [formInstance] = useForm();

    const onSubmit = useCallback(() => {
        formInstance
            .validateFields()
            .then(result => {
                console.log('submit!', result);
            })
            .catch(reason => {
                console.log('error submit!', reason);
            });
    }, [formInstance]);

    const resetForm = useCallback(() => {
        formInstance.resetFields();
    }, [formInstance]);

    const checkAge = useCallback((rule, value, callback) => {
        if (!value) {
            return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                if (value < 18) {
                    callback(new Error('必须年满18岁'));
                } else {
                    callback();
                }
            }
        }, 1000);
    }, []);

    const validatePass = useCallback((rule, value, callback) => {
        if (isEmpty(value)) {
            callback(new Error('请输入密码'));
        } else {
            callback();
        }
    }, []);

    const validatePass2 = useCallback(
        (rule, value, callback) => {
            if (isEmpty(value)) {
                callback(new Error('请再次输入密码'));
            } else if (value !== formInstance.getFieldValue('pass')) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        },
        [formInstance],
    );

    const rules = useMemo<FormRules>(() => {
        return {
            pass: [{ validator: validatePass }],
            checkPass: [{ validator: validatePass2 }],
            age: [{ validator: checkAge }],
        };
    }, [checkAge, validatePass, validatePass2]);

    return (
        <ElForm form={formInstance} rules={rules} style={{ width: 800 }}>
            <ElForm.Item name="pass" label="密码" validateTrigger="onBlur">
                <ElInput />
            </ElForm.Item>
            <ElForm.Item name="checkPass" label="确认密码" validateTrigger="onBlur">
                <ElInput />
            </ElForm.Item>
            <ElForm.Item name="age" label="年龄" validateTrigger="onBlur">
                <ElInputNumber controlsPositionRight />
            </ElForm.Item>
            <ElForm.Item pure>
                <ElButton type="primary" onClick={onSubmit}>
                    提交
                </ElButton>
                <ElButton onClick={resetForm}>重置</ElButton>
            </ElForm.Item>
        </ElForm>
    );
};

export default App;
