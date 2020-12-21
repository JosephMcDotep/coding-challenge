import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router";

import ListWrapper from '../../components/ui/ListWrapper';
import Wrapper from '../../components/ui/Wrapper';
import * as actions from '../../store/actions/users';
import Spinner from '../../components/ui/Spinner';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import Button from '../../components/ui/Button';
import Navbar from '../../components/ui/Navigation/Navbar';

const Profiles = props => {
    const users = useSelector(state => state.users);
    const initialLoad = useSelector(state => state.initialLoad);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!initialLoad) {
            dispatch(actions.fetchUsers());
        }
    }, [users, dispatch, initialLoad])

    let list = <Spinner />;

    const handleAddUser = () => {
        history.push({
            pathname: `/profile/add`,
            state: {
                isEditing: true,
                isNew: true,
                profile: null
            } 
        });
    };

    list = users.map(prof => (
        <ProfileCard key={prof.userId} profile={prof} />
    ));

    return (
        <Wrapper>
            <Navbar />
            <h2>User Profiles</h2>
            <Button cls='add' clicked={() => handleAddUser()}>Add New</Button>
            <ListWrapper>
                {list}
            </ListWrapper>
        </Wrapper>
        
    )
};

export default Profiles;