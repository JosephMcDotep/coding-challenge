import React, { useState } from 'react'
import { useHistory } from "react-router";

import Card from '../ui/Card/Card';
import ImageWrapper from './../ui/Card/ImageWrapper';
import Image from './../ui/Card/Image';
import InitialsWrapper from './../ui/Card/InitialsWrapper';
import Initials from './../ui/Card/Initials';
import DetailsWrapper from './../ui/Card/DetailsWrapper';

const ProfileCard = props => {
    const [profile] = useState(props.profile);
    const history = useHistory();

    const handleUserClick = () => {
        history.push({
            pathname: `/profile`,
            search: `?uid=${profile.userId}`,
            state: {
                profile: profile
            } 
        });
    };

    let avatar = (
        <ImageWrapper>
            <Image alt={`${profile.name.first} ${profile.name.first}`} src={profile.picture.large} />
        </ImageWrapper>
    );
    
    if (!profile.picture.large) {
        const userinitials = `${profile.name.first.substring(0, 1).toUpperCase()} ${profile.name.last.substring(0, 1).toUpperCase()}`;
        avatar = (
            <InitialsWrapper>
                <Initials>{userinitials}</Initials>
            </InitialsWrapper>
        );
    }

    return (
        <Card onClick={() => handleUserClick()}>
            {avatar}
            <h5>{profile.name.first} {profile.name.last}</h5>
            <DetailsWrapper>{profile.phone}</DetailsWrapper>
            <DetailsWrapper>{profile.email}</DetailsWrapper>
        </Card>
    )
};

export default ProfileCard;