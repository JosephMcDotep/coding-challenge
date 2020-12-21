import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router";

import Wrapper from '../ui/Wrapper';
import ImageWrapper from '../ui/Card/ImageWrapper';
import Image from '../ui/Card/Image';
import InitialsWrapper from '../ui/Card/InitialsWrapper';
import DetailsWrapper from '../ui/Card/DetailsWrapper';
import Initials from '../ui/Card/Initials';
import Button from '../ui/Button';
import { EditProfile } from '../Profile/EditProfile';
import ProfileWrapper from '../ui/ProfileWrapper';

const DetsWrapper = styled.div`
    text-align: left;
    padding-left: 200px;
    margin-bottom: 1em;
`;

const InitialsWrapperExtended = styled(InitialsWrapper)`
    margin-top: 40px;
    margin-bottom: 40px;
`;

const ImageWrapperExtended = styled(ImageWrapper)`
    margin-top: 40px;
    margin-bottom: 40px;
`;

const Profile = props => {
    const [profile, setProfile] = useState(props.location.state.profile ? props.location.state.profile : null);
    const [isEditing, setIsEditing] = useState(props.location.state.isEditing ? props.location.state.isEditing : false);
    const [isNew, setIsNew] = useState(props.location.state.isNew ? true : false);
    const history = useHistory();
    let avatar;
    let preVal = {};
    let profileView;

    const handleBackBtn = () => {
        history.push({
            pathname:  "/"
        });
    };

    const handleSave = (data) => {
        setIsNew(false)
        setProfile(data);
        setIsEditing(false);
    }
    
    if (profile) {
        if (!profile.picture.large) {
            const userinitials = `${profile.name.first.substring(0, 1).toUpperCase()} ${profile.name.last.substring(0, 1).toUpperCase()}`;
            
            avatar = (
                <InitialsWrapperExtended>
                    <Initials>{userinitials}</Initials>
                </InitialsWrapperExtended>
            );
        } else {
            avatar = (
                <ImageWrapperExtended>
                    <Image alt={`${profile.name.first} ${profile.name.first}`} src={profile.picture.large} />
                </ImageWrapperExtended>
            );
        }

        preVal = {
            userId: profile.userId,
            firstname: profile.name.first,
            lastname: profile.name.last,
            phone: profile.phone,
            email: profile.email
        }

        profileView = (
            <Wrapper>
                <h3>{`${profile.name.first} ${profile.name.last}`}</h3>
                <DetsWrapper>
                    <DetailsWrapper><b>Phone:</b> {profile.phone}</DetailsWrapper>
                    <DetailsWrapper><b>Email:</b> {profile.email}</DetailsWrapper>
                </DetsWrapper>
                    <Button clicked={() => handleBackBtn()}>Back</Button>
                    <Button clicked={() => setIsEditing(true)}>Edit</Button>
            </Wrapper>
        );
    } else {
        avatar = (
            <InitialsWrapperExtended>
                <Initials></Initials>
            </InitialsWrapperExtended>
        );
    }

    const editView = (
        <Wrapper>
            <EditProfile 
                preloadedValues={preVal} 
                onCancel={() => setIsEditing(false)}
                submitHandler={handleSave}
                isNew={isNew}
                profile={profile} />
        </Wrapper>
        
    );

    return (
        <ProfileWrapper>
            {avatar}
            {isEditing ? editView : profileView}
        </ProfileWrapper>
    )
};

export default Profile;