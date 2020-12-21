import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '../ui/Button';
import Form from '../ui/Form/Form';
import Input from '../ui/Form/Input';
import * as actions from '../../store/actions/users';
import ErrorField from '../ui/Form/ErrorField';
import Label from '../ui/Form/Label';

const schema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email(),
    phone: yup.string()
});

export function EditProfile({ preloadedValues = {}, onCancel, isNew = true, submitHandler, profile }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const users = useSelector(state => state.users);
    const { register, handleSubmit, errors } = useForm({
        defaultValues: preloadedValues,
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        if (isNew) {
            const newRecord = {
                userId: users.length + 1,
                name: {
                    first: data.firstname,
                    last: data.lastname
                },
                email: data.email,
                phone: data.phone,
                picture: {
                    large: null,
                    medium: null,
                    thumbnail: null
                }
            }

            dispatch(actions.addUser(newRecord));
            submitHandler(newRecord);
        } else {
            const updatedData = {
                ...profile,
                name: {
                    first: data.firstname,
                    last: data.lastname
                },
                email: data.email,
                phone: data.phone
            };

            dispatch(actions.editUser(updatedData));
            submitHandler(updatedData);
        }
    };

    const handleCancel = () => {
        if (isNew) {
            history.goBack();
        } else {
            onCancel();
        }
    }
    

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input type="hidden" name="userId"ref={register} />
            <Label>First Name: </Label>
            <Input name="firstname"ref={register} />
            <ErrorField>{errors['firstname']?.message}</ErrorField>
            <Label>Last Name: </Label>
            <Input name="lastname" ref={register} />
            <ErrorField>{errors['lastname']?.message}</ErrorField>
            <Label>Phone: </Label>
            <Input name="phone"ref={register} />
            <ErrorField>{errors['phone']?.message}</ErrorField>
            <Label>Email: </Label>
            <Input name="email" ref={register} />
            
            <ErrorField>{errors['email']?.message}</ErrorField>
            <div>
                <Button cls='add' type="submit">Save</Button>
                <Button clicked={() => handleCancel()}>Cancel</Button>
            </div>
            
        </Form>
    )
};